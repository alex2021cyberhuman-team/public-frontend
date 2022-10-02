import {useLocalization} from "../../../services/localization/reactLocalization";

export default function Banner() {
    const {localization} = useLocalization();
    return (
        <div className='banner'>
            <div className='container'>
                <h1 className='logo-font'>{localization.home.banner.logoTitle}</h1>
                <p>{localization.home.banner.logoText}</p>
            </div>
        </div>
    );
}