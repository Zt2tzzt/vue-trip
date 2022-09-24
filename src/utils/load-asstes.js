/**
 * @description: 此函数用于：在 Vite 环境中，SFC 文件的 template 里，动态绑定图片资源路径。
 * @Author: ZeT1an
 * @param {*} image 图片资源在 @/assets/img 中的相对路径
 * @return {*} 解析后可用于 template 中的路径
 */
export const getAssetURL = (image) => {
	// 在 vite 中，需要通过 ESModule 查找路径
  // new URL(prop1, prop2) prop1: 相对路径；prop2: 当前路径的 URL
  return new URL(`../assets/img/${image}`, import.meta.url).href
}