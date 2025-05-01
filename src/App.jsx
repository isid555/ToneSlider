import {Landing} from "./pages/Landing.jsx";
import {Guide} from "./pages/Guide.jsx";
import {ToneSliderPage} from "./pages/ToneSliderPage.jsx";
import {Footer} from "./pages/Footer.jsx";
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
                <ToneSliderPage/>
                <Footer/>

        </div>
    )
}

export default App
