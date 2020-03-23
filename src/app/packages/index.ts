import {AnglrAnimationsPackage} from './anglrAnimationsPackage';
import {AnglrAuthenticationPackage} from './anglrAuthenticationPackage';
import {AnglrBootstrapPackage} from './anglrBootstrapPackage';
import {AnglrBootstrapCorePackage} from './anglrBootstrapCorePackage';
import {AnglrBootstrapDatetimepickerPackage} from './anglrBootstrapDatetimepickerPackage';
import {AnglrBootstrapTypeaheadPackage} from './anglrBootstrapTypeaheadPackage';
import {AnglrCommonPackage} from './anglrCommonPackage';
import {AnglrCommonFormsPackage} from './anglrCommonFormsPackage';
import {AnglrCommonHmrPackage} from './anglrCommonHmrPackage';
import {AnglrCommonHotkeysPackage} from './anglrCommonHotkeysPackage';
import {AnglrCommonMaterialPackage} from './anglrCommonMaterialPackage';
import {AnglrCommonMomentPackage} from './anglrCommonMomentPackage';
import {AnglrCommonNumeralPackage} from './anglrCommonNumeralPackage';
import {AnglrCommonPositionsPackage} from './anglrCommonPositionsPackage';
import {AnglrCommonRouterPackage} from './anglrCommonRouterPackage';
import {AnglrCommonStorePackage} from './anglrCommonStorePackage';
import {AnglrCommonStructuredLogPackage} from './anglrCommonStructuredLogPackage';
import {AnglrErrorHandlingPackage} from './anglrErrorHandlingPackage';
import {AnglrGridPackage} from './anglrGridPackage';
import {AnglrGridMaterialPackage} from './anglrGridMaterialPackage';
import {AnglrMdHelpPackage} from './anglrMdHelpPackage';
import {AnglrNotificationsPackage} from './anglrNotificationsPackage';
import {AnglrRestPackage} from './anglrRestPackage';
import {AnglrRestStompjsPackage} from './anglrRestStompjsPackage';
import {AnglrSelectPackage} from './anglrSelectPackage';
import {AnglrSelectMaterialPackage} from './anglrSelectMaterialPackage';
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
import {TypeaheadPackage} from './typeaheadPackage';
import {HandlebarsPackage} from './handlebarsPackage';
import {BootstrapPackage} from './bootstrapPackage';
import {JqueryPackage} from './jqueryPackage';
import {Angular2HotkeysPackage} from './angular2HotkeysPackage';
import {PositionsPackage} from './positionsPackage';
import {StructuredLogPackage} from './structuredLogPackage';
import {SourcemappedStacktracePackage} from './sourcemappedStacktracePackage';
import {Html2canvasPackage} from './html2canvasPackage';
import {HighlightJsPackage} from './highlightjsPackage';
import {MarkedPackage} from './markedPackage';
import {JqueryParamPackage} from './jqueryParamPackage';
import {CryptJsPackage} from './cryptoJsPackage';
import {StompJsPackage} from './stompJsPackage';
import {SockJsPackage} from './sockJsPackage';
import {ExtendPackage} from './extendPackage';
import {AnglrType} from '../anglrBase';

/**
 * Packages that are available for processing
 */
export const packages: {[name: string]: AnglrType} =
{
    '@angular/material': AngularMaterialPackage,
    '@angular/cdk': AngularCdkPackage,
    '@anglr/animations': AnglrAnimationsPackage,
    '@anglr/authentication': AnglrAuthenticationPackage,
    '@anglr/bootstrap': AnglrBootstrapPackage,
    '@anglr/bootstrap/core': AnglrBootstrapCorePackage,
    '@anglr/bootstrap/datetimepicker': AnglrBootstrapDatetimepickerPackage,
    '@anglr/bootstrap/typeahead': AnglrBootstrapTypeaheadPackage,
    '@anglr/common': AnglrCommonPackage,
    '@anglr/common/forms': AnglrCommonFormsPackage,
    '@anglr/common/hmr': AnglrCommonHmrPackage,
    '@anglr/common/hotkeys': AnglrCommonHotkeysPackage,
    '@anglr/common/material': AnglrCommonMaterialPackage,
    '@anglr/common/moment': AnglrCommonMomentPackage,
    '@anglr/common/numeral': AnglrCommonNumeralPackage,
    '@anglr/common/positions': AnglrCommonPositionsPackage,
    '@anglr/common/router': AnglrCommonRouterPackage,
    '@anglr/common/store': AnglrCommonStorePackage,
    '@anglr/common/structured-log': AnglrCommonStructuredLogPackage,
    '@anglr/error-handling': AnglrErrorHandlingPackage,
    '@anglr/grid': AnglrGridPackage,
    '@anglr/grid/material': AnglrGridMaterialPackage,
    '@anglr/md-help': AnglrMdHelpPackage,
    '@anglr/notifications': AnglrNotificationsPackage,
    '@anglr/rest': AnglrRestPackage,
    '@anglr/rest/stompjs': AnglrRestStompjsPackage,
    '@anglr/select': AnglrSelectPackage,
    '@anglr/select/material': AnglrSelectMaterialPackage,
    '@jscrpt/common': JscrptCommonPackage,
    '@fortawesome/fontawesome-free': FontAwesomePackage,
    'moment': MomentPackage,
    'bootstrap': BootstrapPackage,
    'jquery': JqueryPackage,
    'eonasdan-bootstrap-datetimepicker': BootstrapDatetimepickerPackage,
    'typeahead.js': TypeaheadPackage,
    'handlebars': HandlebarsPackage,
    'numeral': NumeralPackage,
    'file-saver': FileSaverPackage,
    'd3': D3Package,
    'store': StorePackage,
    'konami': KonamiPackage,
    'angular2-hotkeys': Angular2HotkeysPackage,
    'positions': PositionsPackage,
    'structured-log': StructuredLogPackage,
    'sourcemapped-stacktrace': SourcemappedStacktracePackage,
    'html2canvas': Html2canvasPackage,
    'highlight.js': HighlightJsPackage,
    'marked': MarkedPackage,
    'jquery-param': JqueryParamPackage,
    'crypto-js': CryptJsPackage,
    '@stomp/stompjs': StompJsPackage,
    'sockjs-client': SockJsPackage,
    'extend': ExtendPackage
};