import { Menu, MenuButton, IconButton, MenuList } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { FaEllipsisV } from 'react-icons/fa';


const MessageMenu: FC<{children: ReactNode}> = ({ children }) => {
    return (
        <Menu>
            <MenuButton
                aria-label="message-options"
                as={IconButton}
                icon={<FaEllipsisV />}
                variant="ghost"
            />
            <MenuList>
                {children}
            </MenuList>
        </Menu>
    );
};

export default MessageMenu;
