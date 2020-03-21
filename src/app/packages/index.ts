import {AnglrAnimationsPackage} from './anglrAnimationsPackage';
import {AnglrAuthenticationPackage} from './anglrAuthenticationPackage';
import {AnglrBootstrapPackage} from './anglrBootstrapPackage';
import {AnglrCommonPackage} from './anglrCommonPackage';
import {AnglrErrorHandlingPackage} from './anglrErrorHandlingPackage';
import {AnglrGridPackage} from './anglrGridPackage';
import {AnglrMdHelpPackage} from './anglrMdHelpPackage';
import {AnglrNotificationsPackage} from './anglrNotificationsPackage';
import {AnglrRestPackage} from './anglrRestPackage';
import {AnglrSelectPackage} from './anglrSelectPackage';
import {AngularCdkPackage} from './angularCdkPackage';
import {AngularMaterialPackage} from './angularMaterialPackage';
import {BootstrapDatetimepickerPackage} from './bootstrapDatetimepickerPackage';
import {D3Package} from './d3Package';
import {FileSaverPackage} from './fileSaverPackage';
import {FontAwesomePackage} from './fontAwesomePackage';
import {JscrptCommonPackage} from './jscrptCommonPackage';
import {KonamiPackage} from './konamiPackage';
import {MomentPackage} from './momentPackage';
import {NumeralPackage} from './numeralPackage';
import {StorePackage} from './storePackage';
import {TypeaheadPackage} from './typeagheadPackage';
import {PackageType} from '../packageBase';

/**
 * Packages that are available for processing
 */
export const packages: {[name: string]: PackageType} =
{
    '@angular/material': AngularMaterialPackage,
    '@angular/cdk': AngularCdkPackage,
    '@anglr/animations': AnglrAnimationsPackage,
    '@anglr/authentication': AnglrAuthenticationPackage,
    '@anglr/bootstrap': AnglrBootstrapPackage,
    '@anglr/common': AnglrCommonPackage,
    '@anglr/error-handling': AnglrErrorHandlingPackage,
    '@anglr/grid': AnglrGridPackage,
    '@anglr/md-help': AnglrMdHelpPackage,
    '@anglr/notifications': AnglrNotificationsPackage,
    '@anglr/rest': AnglrRestPackage,
    '@anglr/select': AnglrSelectPackage,
    '@jscrpt/common': JscrptCommonPackage,
    '@fortawesome/fontawesome-free': FontAwesomePackage,
    'moment': MomentPackage,
    'eonasdan-bootstrap-datetimepicker': BootstrapDatetimepickerPackage,
    'typeahead.js': TypeaheadPackage,
    'numeral': NumeralPackage,
    'file-saver': FileSaverPackage,
    'd3': D3Package,
    'store': StorePackage,
    'konami': KonamiPackage
};