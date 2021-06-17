import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStores from '../../hooks/useStores';
import { RegistrationValidation } from '../../interfaces/RegistrationValidation';
import Button from '../button/Button';
import Form from '../form/Form';
import Input from '../input/Input';
import './Registration.scss';

const Registration: React.FC = () => {
    const { userStore } = useStores();
    const history = useHistory();
    const [formValid, setFormValid] = useState<boolean>(false);
    const [userValidation, setUserValidation] = useState<RegistrationValidation>({
        firstName: {
            value: '',
            valid: false,
        },
        lastName: {
            value: '',
            valid: false,
        },
        email: {
            value: '',
            valid: false,
        },
        password: {
            value: '',
            valid: false,
        },
        repeatedPassword: {
            value: '',
            valid: false,
        },
    });

    useEffect(() => {
        setFormValid(
            userValidation.firstName.valid
            && userValidation.lastName.valid
            && userValidation.email.valid
            && userValidation.password.valid
            && (userValidation.password.value === userValidation.repeatedPassword.value),
        );
    }, [formValid, userValidation.email.valid, userValidation.firstName, userValidation.lastName.valid, userValidation.password.valid, userValidation.password.value, userValidation.repeatedPassword.value]);

    const register = async () => {
        const result = await userStore.register(userValidation.firstName.value, userValidation.lastName.value, userValidation.email.value, userValidation.password.value);
        if (result) {
            history.push('/login/successful');
        }
    };

    return (
        <section className="registration">
            <h2>Registration</h2>
            <hr />
            <Form>
                <Input
                    label="First Name"
                    id="firstname"
                    type="text"
                    pattern="[0-9A-Za-z ]{2,32}"
                    minLength={2}
                    maxLength={32}
                    title="Length: 2 - 32 characters."
                    value={userValidation.firstName.value}
                    onChange={(validation) => setUserValidation({ ...userValidation, firstName: validation })}
                />
                <Input
                    label="Last Name"
                    id="lastname"
                    type="text"
                    pattern="[0-9A-Za-z ]{2,32}"
                    minLength={2}
                    maxLength={32}
                    title="Length: 2 - 32 characters."
                    value={userValidation.lastName.value}
                    onChange={(validation) => setUserValidation({ ...userValidation, lastName: validation })}
                />
                <Input
                    label="E-Mail"
                    id="mail"
                    type="email"
                    pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={userValidation.email.value}
                    onChange={(validation) => setUserValidation({ ...userValidation, email: validation })}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$"
                    title="Length: 8 - 20. Use at least one lowercase character, one uppercase character and one number."
                    minLength={8}
                    maxLength={20}
                    value={userValidation.password.value}
                    onChange={(validation) => setUserValidation({ ...userValidation, password: validation })}
                />
                <Input
                    label="Repeat Password"
                    id="repeat-password"
                    type="password"
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$"
                    title="Has to match the aforementioned password."
                    minLength={8}
                    maxLength={20}
                    value={userValidation.repeatedPassword.value}
                    onChange={(validation) => setUserValidation({ ...userValidation, repeatedPassword: validation })}
                />
                <>
                    {userStore.currentErrorOccurred && <p>An error occurred! Please try again later!</p>}
                    <div className="submit">
                        <Button type="submit" ariaLabel="Register" onClick={() => register()} disabled={!formValid}>
                            <span>Register</span>
                        </Button>
                    </div>
                </>
            </Form>
        </section>
    );
};

export default observer(Registration);
