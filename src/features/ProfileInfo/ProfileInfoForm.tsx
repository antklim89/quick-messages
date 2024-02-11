import { Button, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { useProfileInfoFormik } from './ProfileInfo.formik';
import InputField from '~/components/InputField';
import { IProfile } from '~/types';


const ProfileInfoForm: FC<IProfile> = (profile) => {
    const formik = useProfileInfoFormik(profile);

    return (
        <form onSubmit={formik.handleSubmit}>
            <InputField
                autoComplete="name"
                formik={formik}
                isRequired={false}
                name="name"
                placeholder="Enter your name..."
            />
            <InputField
                as="textarea"
                formik={formik}
                isRequired={false}
                name="bio"
                placeholder="Enter your bio..."
                resize="none"
            />
            <Flex justify="flex-end">
                <Button isLoading={formik.isSubmitting} type="submit">
                    Save
                </Button>
            </Flex>
        </form>
    );
};

export default ProfileInfoForm;
