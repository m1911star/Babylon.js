import { IShaderProcessor } from "./iShaderProcessor";
import { Nullable } from "../../types";

/**
 * Function for custom code generation
 */
export type ShaderCustomProcessingFunction = (shaderType: string, code: string) => string;

/** @hidden */
export interface ShaderProcessingContext {}

/** @hidden */
export interface ProcessingOptions {
    defines: string[];
    indexParameters: any;
    isFragment: boolean;
    shouldUseHighPrecisionShader: boolean;
    supportsUniformBuffers: boolean;
    shadersRepository: string;
    includesShadersStore: { [key: string]: string };
    processor: Nullable<IShaderProcessor>;
    version: string;
    platformName: string;
    lookForClosingBracketForUniformBuffer?: boolean;
    processingContext: Nullable<ShaderProcessingContext>;
    isNDCHalfZRange: boolean;
    useReverseDepthBuffer: boolean;
    processCodeAfterIncludes?: ShaderCustomProcessingFunction;
}
