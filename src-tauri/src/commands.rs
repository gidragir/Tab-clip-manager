use tauri::{AppHandle, Emitter};
use serde::Serialize;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct ThemeChange {
  theme: String
}

#[tauri::command]
pub fn change_theme(app: AppHandle, theme: String) {
  println!("{}", theme);
  app.emit("theme-changed", ThemeChange {theme: theme}).unwrap();
}