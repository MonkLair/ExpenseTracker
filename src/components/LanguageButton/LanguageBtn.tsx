import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"


export default function LanguageBtn() {
    const [isAnotherLanguage, setISAnotherLanguage] = useState<boolean>(false)
  return (
    <div>
        <button onClick={() => setISAnotherLanguage(!isAnotherLanguage)} className="language-button">
            <FontAwesomeIcon className="language-button-icon" icon={faEarthAmericas} />
            <span>
                { isAnotherLanguage 
                    ? 'বাংলা'
                    : 'English'
                }
            </span>
        </button>
    </div>
  )
}
