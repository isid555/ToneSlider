import {Landing} from "./components/Landing.jsx";
import {Guide} from "./components/Guide.jsx";
import {ToneSlider} from "./components/ToneSlider.jsx";
import {Footer} from "./components/Footer.jsx";
import { Toaster } from 'sonner';

function App() {

    return(
        <div>
            <div className="text-3xl font-bold underline">
                Hello world!
            </div>
            <Toaster/>
                <Landing/>
                <Guide/>
                <ToneSlider/>
                <Footer/>

        </div>
    )
}

export default App
