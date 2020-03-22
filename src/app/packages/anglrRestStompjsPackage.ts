import {PackageBase} from '../packageBase';
import {AnglrPackages} from '../interfaces/types';

/**
 * Represents package modifications for anglr rest stompjs
 */
export class AnglrRestStompjsPackage extends PackageBase
{
    //######################### public properties #########################

    /**
     * Array of packages that is this package dependend on
     */
    public static get dependsOnPackages(): AnglrPackages[]
    {
        return ['@jscrpt/common', '@anglr/common', 'sockjs-client', '@stomp/stompjs'];
    }

    /**
     * Array of packages that should be deleted when this one is not used
     */
    public static get cascadeDelete(): AnglrPackages[]
    {
        return ['sockjs-client', '@stomp/stompjs'];
    }

    //######################### public methods #########################

    /**
     * Activates this package transformation
     */
    public activate(): void
    {
        super.activate();
    }
}