/* eslint-disable import/prefer-default-export */
export const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};

export const stringAvatar = (name: string) => {
    const splitName = name.split(' ');
    const firsNameFirsttLetter = splitName[0].charAt(0);
    const lastNameFirsttLetter = (splitName[1] && splitName[1].charAt(0)) || '';
    return {
        children: `${firsNameFirsttLetter}${lastNameFirsttLetter}`,
    };
};
