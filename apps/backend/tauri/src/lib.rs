use std::sync::{Arc, Mutex};

use tauri::{AppHandle, Emitter, State, WindowEvent};

// use prisma::PrismaClient;

#[derive(Default)]
struct ClipboardState {
    recent: Vec<String>,
}
#[allow(warnings)]
mod prisma;
mod shortcuts;
mod tray_menu;
mod watcher;

#[tauri::command]
fn get_recent_clipboard_entries(
    clipboard_state: State<'_, Arc<Mutex<ClipboardState>>>,
) -> Vec<String> {
    let state = clipboard_state.lock().unwrap();
    state.recent.clone()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let clipboard_state = Arc::new(Mutex::new(ClipboardState::default()));
    tauri::Builder::default()
        .manage(clipboard_state.clone())
        .setup(|app| {
            let app_handle = app.handle();
            start_app(&app_handle)?;

            let app_handle_clone = app_handle.clone();
            tauri::async_runtime::spawn(async move {
                watcher::run(app_handle_clone).await;
            });
            Ok(())
        })
        .on_menu_event(|app, event| tray_menu::on_menu_event(app, event))
        .on_window_event(|window, event| match event {
            WindowEvent::CloseRequested { api, .. } => {
                if let Err(e) = window.hide() {
                    eprintln!("Failed to hide window: {:?}", e);
                }
                api.prevent_close();
            }
            WindowEvent::Focused(focused) => {
                if window.label() == "Tab_Clip_Manager_main" {
                    if *focused {
                        window.emit("window_open", ()).unwrap();
                    } else {
                        window.hide().unwrap();
                    }
                }
            }
            _ => {}
        })
        .invoke_handler(tauri::generate_handler![get_recent_clipboard_entries])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn start_app(app: &AppHandle) -> anyhow::Result<()> {
    tray_menu::setup_tray_menu(app)?;
    shortcuts::add_shortcuts(app)?;

    app.plugin(tauri_plugin_clipboard_manager::init())?;
    Ok(())
}
