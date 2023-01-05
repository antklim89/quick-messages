import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FC } from 'react';
import { FaEllipsisV } from 'react-icons/fa';


const MessageMenu: FC = () => {
    return (
        <Menu>
            <MenuButton
                aria-label="message-options"
                as={IconButton}
                icon={<FaEllipsisV />}
                variant="ghost"
            />
            <MenuList>
                <MenuItem>
                    Report
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default MessageMenu;
