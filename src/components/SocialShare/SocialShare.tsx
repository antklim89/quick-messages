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


const SocialShare: FC<SocialShareProps> = ({ title, url }) => {
    const [isLoad, setIsLoad] = useState(false);
    const fullUrl = `${location.origin}${url}`;

    useEffect(() => setIsLoad(true), []);

    if (!isLoad) return null;
    return (
        <HStack sx={{ svg: { width: 8 } }}>
            <VKShareButton
                title={title}
                url={fullUrl}
            >
                <VKIcon />
            </VKShareButton>
            <EmailShareButton
                subject={title}
                url={fullUrl}
            >
                <EmailIcon />
            </EmailShareButton>
            <TelegramShareButton
                title={title}
                url={fullUrl}
            >
                <TelegramIcon />
            </TelegramShareButton>
            <TwitterShareButton
                title={title}
                url={fullUrl}
            >
                <TwitterIcon />
            </TwitterShareButton>
            <RedditShareButton
                title={title}
                url={fullUrl}
            >
                <RedditIcon />
            </RedditShareButton>
        </HStack>
    );
};

export default SocialShare;

