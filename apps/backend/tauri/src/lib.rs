use std::sync::Mutex;

use tauri::{self, Emitter, State};
mod shortcuts;
mod tray_menu;

#[allow(warnings)]
mod prisma;

use prisma::PrismaClient;

#[derive(Default)]
struct RecentClipElements {
    data: Mutex<String>,
}

#[tauri::command]
fn get_recent(state: State<RecentClipElements>) -> String{
    let data = state.data.lock().unwrap();
    data.clone()
}
#[tauri::command]
fn set_data(state: State<RecentClipElements>, new_data: String) {
    let mut data = state.data.lock().unwrap();
    *data = new_data;
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
    tauri::Builder::default()
        .manage(RecentClipElements::default())
        .invoke_handler(tauri::generate_handler![get_recent, set_data])
        .plugin(tauri_plugin_clipboard_manager::init())
        .setup(|app| {
            tray_menu::setup_tray_menu(app)?;
            shortcuts::add_shortcuts(app)?;
            Ok(())
        })
        .on_menu_event(|app, event| tray_menu::on_menu_event(app, event))
        .on_window_event(|window, event| match event {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                window.hide().unwrap();
                api.prevent_close();
            }
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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
