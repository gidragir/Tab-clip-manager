use std::sync::{Arc, Mutex};

use tauri::{App, AppHandle, Emitter, State};
use tauri_plugin_clipboard_manager::ClipboardExt;
use tokio::time::{self, Duration};

// use prisma::PrismaClient;

#[derive(Default)]
struct ClipboardState {
    recent: Vec<String>,
}
#[allow(warnings)]
mod prisma;
mod shortcuts;
mod tray_menu;

#[tauri::command]
fn get_recent_clipboard_entries(
    clipboard_state: State<'_, Arc<Mutex<ClipboardState>>>,
) -> Vec<String> {
    let state = clipboard_state.lock().unwrap();
    println!("Returning recent clipboard entries: {:?}", state.recent);
    state.recent.clone()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() -> anyhow::Result<()> {
    let clipboard_state = Arc::new(Mutex::new(ClipboardState::default()));
    let app = tauri::Builder::default()
        .manage(clipboard_state.clone())
        .setup(|app| {
            let app_handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                start_app(&app_handle).await.unwrap();
            });
            Ok(())
        })
        .on_menu_event(|app, event| tray_menu::on_menu_event(app, event))
        .on_window_event(|window, event| match event {
            tauri::WindowEvent::Focused(focused) => {
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
        .build(tauri::generate_context!())?;

    app.run(|_app_handle, event| match event {
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    });

    Ok(())
}

async fn start_app(app: &AppHandle) -> anyhow::Result<()> {
    tray_menu::setup_tray_menu(app)?;
    shortcuts::add_shortcuts(app)?;

    app.plugin(tauri_plugin_clipboard_manager::init())?;
    Ok(())
}
