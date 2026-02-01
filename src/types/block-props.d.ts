type PropsAllType = string | number | boolean | Array | Block | null;

interface BlockProps {
    [key: string]: PropsAllType;
}
