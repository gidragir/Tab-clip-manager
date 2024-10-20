import "style/App.scss";
import "style/theme.scss"



function App() {

  const elements: string[] = ["Text1", "Text2", "Text3", "Text4", "Text5", "Text6", "Text7", "Text8", "Text9", "Text10"];
  const tabs: string[] = ["Text1", "Text2", "Text3", "Text4", "Text5"];

  return (
    <div className="container flex flex-col content-center text-center rounded-sm bg-bg_main">
      <div className="flex flex-row pb-2">
        {tabs.map(tab => (
          <div className="w-10 h-10 mt-1 mr-3 rounded-sm tab bg-bg_clip">
            <p>{tab}</p>
          </div>
        ))}
      </div>
      <div className="overflow-y-auto clip-elements text-start">
        {elements.map(element => (
          <div className="transition-all rounded-sm bg-bg_clip clip-element hover:shadow-sm hover:shadow-slate-500">
            <p>{element}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
