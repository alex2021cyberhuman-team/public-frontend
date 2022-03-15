import localizedStrings from "../../../services/localization";

export default function Banner() {
    return (
        <div className='banner'>
            <div className='container'>
                <h1 className='logo-font'>{localizedStrings.home.banner.logoTitle}</h1>
                <p>{localizedStrings.home.banner.logoText}</p>
            </div>
        </div>
    );
}