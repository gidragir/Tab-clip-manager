use tauri::{AppHandle, Error, Manager};
// use tauri_plugin_clipboard_manager::ClipboardExt;
use tauri_plugin_global_shortcut::{
    Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutEvent, ShortcutState,
};

#[cfg(desktop)]
pub fn add_shortcuts(app: &AppHandle) -> Result<(), Error> {
    app.plugin(
        tauri_plugin_global_shortcut::Builder::new()
            .with_handler(move |_app, shortcut, event| {
                main_shortcut_handler(_app, shortcut, event);
                // copy_shortcut_handler(_app, shortcut, event);
                // cut_shortcut_handler(_app, shortcut, event);
                // paste_shortcut_handler(_app, shortcut, event);
            })
            .build(),
    )?;

    let shortcuts = [
        main_shortcut(),
        // copy_shortcut(),
        // cut_shortcut(),
        // paste_shortcut(),
    ];

    for shortcut in shortcuts {
        add_shortcut(app, shortcut);
    }
    Ok(())
}

// region: Shortcuts
fn main_shortcut() -> Shortcut {
    Shortcut::new(Some(Modifiers::ALT), Code::KeyQ)
}

// fn copy_shortcut() -> Shortcut {
//     Shortcut::new(Some(Modifiers::CONTROL), Code::KeyC)
// }

// fn cut_shortcut() -> Shortcut {
//     Shortcut::new(Some(Modifiers::CONTROL), Code::KeyX)
// }

// fn paste_shortcut() -> Shortcut {
//     Shortcut::new(Some(Modifiers::CONTROL), Code::KeyV)
// }
// endregion

// region: Shortcuts handler
fn main_shortcut_handler(app: &AppHandle, shortcut: &Shortcut, event: ShortcutEvent) {
    if shortcut != &main_shortcut() {
        return;
    }
    match event.state() {
        ShortcutState::Pressed => {}
        ShortcutState::Released => {
            app.get_webview_window("Tab_Clip_Manager_main").and_then(|window| {
                window
                    .show()
                    .map_err(|e| {
                        eprintln!("Failed to show window: {:?}", e);
                        e
                    })
                    .ok()
            });
        }
    }
}

// fn copy_shortcut_handler(app: &AppHandle, shortcut: &Shortcut, event:
// ShortcutEvent) {     if shortcut != &copy_shortcut() {
//         return;
//     }
//     match event.state() {
//         ShortcutState::Pressed => {}
//         ShortcutState::Released => {}
//     }
// }

// fn cut_shortcut_handler(app: &AppHandle, shortcut: &Shortcut, event:
// ShortcutEvent) {     if shortcut != &cut_shortcut() {
//         return;
//     }
//     match event.state() {
//         ShortcutState::Pressed => {}
//         ShortcutState::Released => {
//             let content = app.clipboard().read_text();
//             println!("{:?}", content.unwrap());
//         }
//     }
// }

// fn paste_shortcut_handler(app: &AppHandle, shortcut: &Shortcut, event:
// ShortcutEvent) {     if shortcut != &paste_shortcut() {
//         return;
//     }
//     match event.state() {
//         ShortcutState::Pressed => {}
//         ShortcutState::Released => {
//             // let clipboard = app.clipboard();
//             // let content = clipboard.read_text();
//             // clipboard.write_text(content)
//         }
//     }
// }
// endregion

fn add_shortcut(app: &AppHandle, shortcut: Shortcut) {
    let _ = app.global_shortcut().register(shortcut);
}
