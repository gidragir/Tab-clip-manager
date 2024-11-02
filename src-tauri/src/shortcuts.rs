use tauri::{App, Error};
use tauri_plugin_global_shortcut::{
    Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutEvent, ShortcutState,
};

#[cfg(desktop)]
pub fn add_shortcuts(app: &mut App) -> Result<(), Error> {
  app.handle().plugin(
      tauri_plugin_global_shortcut::Builder::new()
          .with_handler(move |_app, shortcut, event| {
              main_shortcut_handler(shortcut, event);
          })
          .build(),
  )?;

  add_shortcut(app, main_shortcut());
  Ok(())
}

fn main_shortcut() -> Shortcut {
  Shortcut::new(Some(Modifiers::ALT | Modifiers::SUPER), Code::KeyV)
}

fn add_shortcut(app: &mut App, shortcut: Shortcut) {
  let _ = app.global_shortcut().register(shortcut);
}

fn main_shortcut_handler(shortcut: &Shortcut, event: ShortcutEvent) {
  if shortcut == &main_shortcut() {
      match event.state() {
          ShortcutState::Pressed => {}
          ShortcutState::Released => {
              println!("Ctrl-N Released!");
          }
      }
  }
}
