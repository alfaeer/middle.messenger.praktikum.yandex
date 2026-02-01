
type PropsAllType = string | number | boolean | unknown;

interface CustomObject {
    [key: string | symbol]: PropsAllType;
}
