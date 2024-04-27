import useLocalization from '../Context/LocalizationContext/LoclaesContext';

const useContent = (superKey) => {
    const { t } = useLocalization();

    const setContent = (key) => {
        if (superKey) {
            return t(`${superKey}.${key}`);
        } else {
            return t(key);
        }
    };

    return setContent;
};

export default useContent;
