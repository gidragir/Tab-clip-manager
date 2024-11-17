use tauri::{App, AppHandle, Manager, Error};
use tauri_plugin_global_shortcut::{
    Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutEvent, ShortcutState,
};

#[cfg(desktop)]
pub fn add_shortcuts(app: &mut App) -> Result<(), Error> {
  app.handle().plugin(
      tauri_plugin_global_shortcut::Builder::new()
          .with_handler(move |_app, shortcut, event| {
              main_shortcut_handler(_app, shortcut, event);
          })
          .build(),
  )?;

  add_shortcut(app, main_shortcut());
  Ok(())
}

fn main_shortcut() -> Shortcut {
  Shortcut::new(Some(Modifiers::ALT | Modifiers::SUPER), Code::KeyV)
}

fn main_shortcut_handler(app: &AppHandle, shortcut: &Shortcut, event: ShortcutEvent) {
  if shortcut == &main_shortcut() {
      match event.state() {
          ShortcutState::Pressed => {}
          ShortcutState::Released => {
            let window = app.get_webview_window("Tab_Clip_Manager_main").unwrap();
            let _ = &window.show();
            let _ = &window.set_focus();
          }
      }
  }
}


fn add_shortcut(app: &mut App, shortcut: Shortcut) {
  let _ = app.global_shortcut().register(shortcut);
}