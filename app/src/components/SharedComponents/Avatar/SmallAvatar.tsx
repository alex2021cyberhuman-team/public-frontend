import {useLocalization} from "../../../services/localization/reactLocalization";
import { resolveDefaultAvatar } from "../../../types/users/resolveDefaultAvatar";

export default function SmallAvatar({image, username}:{image?: string | null | undefined, username: string}){
    const {localization} = useLocalization();
    return (<img src={image || resolveDefaultAvatar()} alt={localization.formatString(localization.userInfo.avatarAlt, username).toString()}/>)
}