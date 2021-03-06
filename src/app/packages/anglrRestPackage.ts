import {PackageBase} from '../packageBase';
import {AnglrPackages} from '../interfaces/types';

/**
 * Represents package modifications for anglr rest
 */
export class AnglrRestPackage extends PackageBase
{
    //######################### public properties #########################

    /**
     * Array of packages that is this package dependend on
     */
    public static get dependsOnPackages(): AnglrPackages[]
    {
        return ['@jscrpt/common', '@anglr/common', 'jquery-param', 'crypto-js'];
    }

    /**
     * Array of packages that should be deleted when this one is not used
     */
    public static get cascadeDelete(): AnglrPackages[]
    {
        return ['jquery-param', 'crypto-js', '@anglr/rest/stompjs'];
    }

    //######################### public methods #########################

    /**
     * Runs code that enable this
     */
    public enable(): void
    {
        super.enable();
    }
}