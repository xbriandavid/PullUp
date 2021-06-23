import React, {FC, ReactElement} from "react"
import "./styles.css"

const ConstructionWarning: FC<{}> = (): ReactElement => {
    return(
        <div className="construction-page">
            <section className="error-container">
                <h1 id="main-header">This page is currently in construction!</h1>
                <p id="caption">Check out our about page for future updates.</p>
            </section>
        </div>
    )
}

export default ConstructionWarning