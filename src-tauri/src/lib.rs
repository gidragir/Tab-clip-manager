use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder, Manager,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let open = MenuItem::with_id(app, "open", "Open", true, None::<&str>)?;
            let hide = MenuItem::with_id(app, "hide", "Hide", true, None::<&str>)?;
            let settings = MenuItem::with_id(app, "settings", "Settings", true, None::<&str>)?;
            let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&open, &hide, &quit, &settings])?;

            let _tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .menu_on_left_click(true)
                .build(app)?;
            Ok(())
        })
        .on_menu_event(|app, event| match event.id.as_ref() {
            "open" => {
                let window = app.get_webview_window("Tab_Clip_Manager_main").unwrap();
                let _ = window.show();
                let _ = window.set_focus();
            }
            "hide" => {
                app.get_webview_window("Tab_Clip_Manager_main")
                .unwrap()
                .hide()
                .unwrap();
            }
            "settings" => {
                let window = app.get_webview_window("Tab_Clip_Manager_settings").unwrap();
                let _ = window.show();
                let _ = window.set_focus();
            }
            "quit" => {
                app.exit(0);
            }
            _ => {
                println!("menu item {:?} not handled", event.id);
            }
        })
        .plugin(tauri_plugin_shell::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
