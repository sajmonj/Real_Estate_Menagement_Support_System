import {useState} from "react"
import { useNavigate } from "react-router-dom";
import documentsData from "./documentsData";
import samplePDF1 from "./samples/1.pdf";
import samplePDF2 from "./samples/2.pdf";
import samplePDF3 from "./samples/3.pdf";
import samplePDF4 from "./samples/4.pdf";
import samplePDF5 from "./samples/5.pdf";
import samplePDF6 from "./samples/6.pdf";
import samplePDF7 from "./samples/7.pdf";
import samplePDF8 from "./samples/8.pdf";
import samplePDF9 from "./samples/9.pdf";
import samplePDF10 from "./samples/10.pdf";
import samplePDF11 from "./samples/11.pdf";
import samplePDF12 from "./samples/12.pdf";
import samplePDF13 from "./samples/13.pdf";
import samplePDF14 from "./samples/14.pdf";
import samplePDF15 from "./samples/15.pdf";
import samplePDF16 from "./samples/16.pdf";
import samplePDF17 from "./samples/17.pdf";
import samplePDF18 from "./samples/18.pdf";
import samplePDF19 from "./samples/19.pdf";
import samplePDF20 from "./samples/20.pdf";
import samplePDF21 from "./samples/21.pdf";

const samplesPDF = [samplePDF1, samplePDF2, samplePDF3, samplePDF4, samplePDF5, samplePDF6, samplePDF7,
     samplePDF8, samplePDF9, samplePDF10, samplePDF11, samplePDF12, samplePDF13, samplePDF14, samplePDF15,
     samplePDF16, samplePDF17, samplePDF18, samplePDF19, samplePDF20, samplePDF21];

const DocumentList = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const navigate = useNavigate();

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredDocuments = selectedCategory === 'all'
        ? documentsData
        : documentsData.filter(doc => doc.category === selectedCategory);


    return (
        <div>
            <span className="hyperlink text12" onClick={() => navigate("/")}>&lt; Go back to the main page</span>
            <div>
                <label>Filtruj po kategorii:</label>
                <select onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option value="all">Wszystko</option>
                    <option value="sprzedaż">Sprzedaż</option>
                    <option value="najem">Najem</option>
                    <option value="inne">Inne</option>
                </select>
            </div>

            <ul>
                {filteredDocuments.map(doc => (
                    <li key={doc.id}>
                        <a href={samplesPDF[doc.id-1]} target="_blank" rel="noreferrer">
                            {doc.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DocumentList;