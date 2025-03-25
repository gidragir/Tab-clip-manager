use std::{
    sync::{Arc, Mutex},
    time::Duration,
};

use tauri::{AppHandle, Manager, async_runtime::spawn};
use tauri_plugin_clipboard_manager::ClipboardExt;
use tokio::{sync::watch, time::sleep};

use crate::ClipboardState;

pub async fn run(app_handle: AppHandle) {
    let (tx, mut rx) = watch::channel(String::new());

    let app_handle_clone = app_handle.clone();
    spawn(async move {
        let mut last_content = String::new();

        loop {
            match app_handle_clone.clipboard().read_text() {
                Ok(content) => {
                    if content != last_content {
                        last_content = content.clone();
                        let _ = tx.send(content);
                    }
                }
                Err(e) => {
                    eprintln!("Clipboard read error: {:?}", e);
                }
            }
            sleep(Duration::from_millis(500)).await;
        }
    });


    let app_handle_clone = app_handle.clone();
    spawn(async move {
        while rx.changed().await.is_ok() {
            let new_content = rx.borrow().clone();

            if let Some(state) = app_handle_clone.try_state::<Arc<Mutex<ClipboardState>>>() {
                let mut clipboard_state = state.lock().unwrap();
                clipboard_state.recent.insert(0, new_content);
            }
        }
    });
}
