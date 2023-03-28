import { Menu, MenuButton, IconButton, MenuList } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';


const MessageMenu: FC<{children: ReactNode}> = ({ children }) => {
    return (
        <Menu isLazy>
            <MenuButton
                aria-label="message-options"
                as={IconButton}
                icon={<BsThreeDotsVertical />}
                variant="ghost"
            />
            <MenuList>
                {children}
            </MenuList>
        </Menu>
    );
};

export default MessageMenu;
