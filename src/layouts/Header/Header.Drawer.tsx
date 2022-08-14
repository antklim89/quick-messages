import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Button, Drawer, DrawerOverlay, DrawerContent, DrawerBody, useDisclosure,
} from '@chakra-ui/react';
import { FC, useRef, ReactNode, MouseEventHandler, useCallback } from 'react';


const HeaderDrawer: FC<{children: ReactNode}> = ({ children }) => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleClick: MouseEventHandler = useCallback((e) => {
        if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) {
            onClose();
        }
    }, [onClose]);

    return (
        <>
            <Button
                color="black"
                ref={btnRef}
                variant="link"
                onClick={onToggle}
            >
                <HamburgerIcon />
            </Button>
            <Drawer
                finalFocusRef={btnRef}
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
            >
                <DrawerOverlay onClick={onClose} />
                <DrawerContent >
                    <DrawerBody onClick={handleClick}>
                        {children}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default HeaderDrawer;
