use tauri::{
    menu::{Menu, MenuEvent, MenuItem},
    tray::TrayIconBuilder,
    App, AppHandle, Error, Manager,
};

pub fn setup_tray_menu(app: &mut App) -> Result<(), Error> {
    let open = MenuItem::with_id(app, "open", "Open", true, None::<&str>)?;
    let hide = MenuItem::with_id(app, "hide", "Hide", true, None::<&str>)?;
    let settings = MenuItem::with_id(app, "settings", "Settings", true, None::<&str>)?;
    let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;

    let menu = Menu::with_items(app, &[&open, &hide, &settings, &quit])?;

    let _tray = TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .menu_on_left_click(true)
        .build(app)?;
    Ok(())
}

pub fn on_menu_event(app: &AppHandle, event: MenuEvent) {
    match event.id.as_ref() {
        "open" => {
            let window = app.get_webview_window("Tab_Clip_Manager_main").unwrap();
            let _ = &window.show();
            let _ = &window.set_focus();
        }
        "hide" => {
            app.get_webview_window("Tab_Clip_Manager_main")
                .unwrap()
                .hide()
                .unwrap();
        }
        "settings" => {
            let window = app.get_webview_window("Tab_Clip_Manager_settings").unwrap();
            let _ = &window.show();
            let _ = &window.set_focus();
        }
        "quit" => {
            app.exit(0);
        }
        _ => {
            println!("menu item {:?} not handled", event.id);
        }
    }
}
