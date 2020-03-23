/**
 * Available anglr features
 */
export type AnglrFeatures = 'Git Version'|'ES2015';
// planned features
// export type AnglrFeatures = 'Git Version'|'Server Side Rendering'|'ES2015'|'Docker'|'Translations'|'Logging'|'Service Worker'|'Hotkeys'|'Authentication'|'Default pages';

/**
 * Available built in packages internal
 */
export type AnglrPackagesInternal = AnglrPackages|
                                    'numeral-languages'|
                                    'typeahead'|
                                    '@kukjevov/gulp-git-version';

/**
 * Available built in packages
 */
export type AnglrPackages = '@angular/material'|
                            '@angular/cdk'|
                            '@anglr/animations'|
                            '@anglr/authentication'|
                            '@anglr/bootstrap'|
                            '@anglr/bootstrap/core'|
                            '@anglr/bootstrap/datetimepicker'|
                            '@anglr/bootstrap/typeahead'|
                            '@anglr/common'|
                            '@anglr/common/forms'|
                            '@anglr/common/hmr'|
                            '@anglr/common/hotkeys'|
                            '@anglr/common/material'|
                            '@anglr/common/moment'|
                            '@anglr/common/numeral'|
                            '@anglr/common/positions'|
                            '@anglr/common/router'|
                            '@anglr/common/store'|
                            '@anglr/common/structured-log'|
                            '@anglr/error-handling'|
                            '@anglr/grid'|
                            '@anglr/grid/material'|
                            '@anglr/md-help'|
                            '@anglr/notifications'|
                            '@anglr/rest'|
                            '@anglr/rest/stompjs'|
                            '@anglr/select'|
                            '@anglr/select/material'|
                            '@jscrpt/common'|
                            '@fortawesome/fontawesome-free'|
                            'moment'|
                            'bootstrap'|
                            'jquery'|
                            'eonasdan-bootstrap-datetimepicker'|
                            'typeahead.js'|
                            'handlebars'|
                            'numeral'|
                            'file-saver'|
                            'd3'|
                            'store'|
                            'konami'|
                            'angular2-hotkeys'|
                            'positions'|
                            'structured-log'|
                            'html2canvas'|
                            'sourcemapped-stacktrace'|
                            'marked'|
                            'highlight.js'|
                            'jquery-param'|
                            'crypto-js'|
                            '@stomp/stompjs'|
                            'sockjs-client'|
                            'extend';