use tauri::{
    AppHandle, Error, Manager,
    menu::{Menu, MenuEvent, MenuItem},
    tray::TrayIconBuilder,
};

pub fn setup_tray_menu(app: &AppHandle) -> Result<(), Error> {
    let settings = MenuItem::with_id(app, "settings", "Settings", true, None::<&str>)?;
    let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;

    let menu = Menu::with_items(app, &[&settings, &quit])?;

    let _tray = TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .show_menu_on_left_click(true)
        .build(app)?;
    Ok(())
}

pub fn on_menu_event(app: &AppHandle, event: MenuEvent) {
    match event.id.as_ref() {
        "settings" => {
            app.get_webview_window("Tab_Clip_Manager_settings").and_then(|window| {
                window
                    .show()
                    .map_err(|e| {
                        eprintln!("Failed to show window: {:?}", e);
                        e
                    })
                    .ok()
            });
        }
        "quit" => {
            app.exit(0);
        }
        _ => {}
    }
}
