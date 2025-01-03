use tauri::{Manager, WindowEvent};
mod shortcuts;
mod tray_menu;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            tray_menu::setup_tray_menu(app)?;
            shortcuts::add_shortcuts(app)?;
            Ok(())
        })
        .on_menu_event(|app, event| tray_menu::on_menu_event(app, event))
        .on_window_event(|window, event|
            match event {
                WindowEvent::CloseRequested { api, .. } => {
                    window.hide().unwrap();
                    api.prevent_close();
                }
                _ => {}
            }
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
