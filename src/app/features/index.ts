import {Es2015Feature} from './es2015Feature';
import {GitVersionFeature} from './gitVersionFeature';
import {AnglrType} from '../anglrBase';

/**
 * Features that are available for processing
 */
export const features: {[name: string]: AnglrType} =
{
    'Git Version': GitVersionFeature,
    'ES2015': Es2015Feature
};