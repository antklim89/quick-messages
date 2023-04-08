import { HStack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import {
    VKShareButton,
    VKIcon,
    EmailIcon,
    EmailShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
} from 'react-share';
import { SocialShareProps } from './SocialShare.types';


const buttons = [
    { ShareButton: VKShareButton, Icon: VKIcon, id: 1 },
    { ShareButton: TelegramShareButton, Icon: TelegramIcon, id: 2 },
    { ShareButton: TwitterShareButton, Icon: TwitterIcon, id: 3 },
    { ShareButton: RedditShareButton, Icon: RedditIcon, id: 4 },
] as const;

const SocialShare: FC<SocialShareProps> = ({ title, url, body }) => {
    const [isLoad, setIsLoad] = useState(false);
    const fullUrl = `${location.origin}${url}`;

    useEffect(() => setIsLoad(true), []);

    if (!isLoad) return null;
    return (
        <HStack>
            {buttons.map(({ ShareButton, Icon, id }) => (
                <ShareButton key={id} title={title} url={fullUrl}>
                    <Icon round size={32} />
                </ShareButton>
            ))}
            <EmailShareButton body={body} subject={title} url={fullUrl}>
                <EmailIcon round size={32} />
            </EmailShareButton>
        </HStack>
    );
};

export default SocialShare;

