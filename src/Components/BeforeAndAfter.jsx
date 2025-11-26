import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import antes from '../assets/mujerantes.png'
import despues from '../assets/mujerdespues.png'
export default function BeforeAndAfter() {
  
return (
    <div className="relative w-full h-[90vh] flex items-center justify-center bg-gray-100">
      <div className="relative w-[90%] h-[85vh]  overflow-hidden shadow-lg">
        <ReactCompareSlider
            
          itemOne={
            <ReactCompareSliderImage
              src={antes}
              alt="Antes"
              style={{ objectFit: "cover" }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={despues}
              alt="Después"
              style={{ objectFit: "cover" }}
            />
          }
          position={50} // posición inicial en el centro
          className="w-full h-full"
        />

        {/* Textos “Antes” y “Después” */}
        <p className="absolute bottom-6 left-6 text-white text-2xl font-semibold drop-shadow-lg">
          Antes
        </p>
        <p className="absolute bottom-6 right-6 text-white text-2xl font-semibold drop-shadow-lg">
          Después
        </p>
      </div>
    </div>
  );
}