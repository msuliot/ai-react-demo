import React from "react";
import "./PageTitleDescription.css"

const PageTitleDescription = ({pageTitle}) => {

    return (
        <div className="bgColor">
            <div className="pageTitle">{pageTitle}</div>
        </div>
    )
}

export default PageTitleDescription;