/**
 * HTML页面生成器
 * 基于brands-data.js中的配置，批量生成所有品牌页面
 */

const { BRANDS, PARTS_DATA, CATEGORY_MAP } = require('./brands-data.js');
const fs = require('fs');
const path = require('path');

// 分类到路径和图标的映射
const CATEGORY_INFO = {
    '发动机类': { path: '发动机与传动系统', icon: 'fa-cog', relatedFiles: ['engine-assembly.html', 'engine-assembly-kymco.html', 'carburetor-mikuni.html', 'oil-pump-champion.html', 'piston-ring-guggi.html', 'starter-motor-daido.html', 'clutch-plate-jianda.html'] },
    '车架类': { path: '车架与悬挂', icon: 'fa-motorcycle', relatedFiles: ['frame.html', 'frame-nitto.html', 'shock-absorber.html', 'shock-absorber-sachs.html', 'rear-shock-kayaba.html', 'headlight-showa.html'] },
    '电气类': { path: '电气系统', icon: 'fa-bolt', relatedFiles: ['battery.html', 'battery-yuasa.html', 'spark-plug.html', 'spark-plug-bosch.html', 'spark-plug-denso.html'] },
    '制动类': { path: '制动系统', icon: 'fa-discord', relatedFiles: ['brake-disc.html', 'brake-disc-brembo.html', 'brake-shoe-nissan.html'] },
    '传动类': { path: '传动系统', icon: 'fa-link', relatedFiles: ['chain.html', 'chain-gates.html', 'drive-belt-did.html', 'clutch-plate-jianda.html'] },
    '外观件': { path: '外观与装饰', icon: 'fa-circle', relatedFiles: ['fairing.html', 'fairing-csun.html', 'tire.html', 'tire-cmt.html', 'tire-kenda.html', 'exhaust.html', 'exhaust-tucano.html'] }
};

// Unsplash图片映射
const IMAGE_MAP = {
    // 发动机类
    'pistonRing': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'cylinderBlock': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'crankshaft': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'camshaft': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'valveGuide': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'connectingRod': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'oilPump': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'waterPump': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'carburetor': 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&q=80',
    'clutchPlate': 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&q=80',
    'starterMotor': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'generator': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',

    // 车架类
    'frontShock': 'https://images.unsplash.com/photo-1558981033-0f0309284409?w=800&q=80',
    'rearShock': 'https://images.unsplash.com/photo-1558981033-0f0309284409?w=800&q=80',
    'handlebar': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&q=80',
    'steeringColumn': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&q=80',
    'mainStand': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&q=80',
    'sideStand': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&q=80',
    'sprocket': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'rearSwingarm': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&q=80',
    'frontFork': 'https://images.unsplash.com/photo-1558981033-0f0309284409?w=800&q=80',
    'handleSwitch': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',

    // 电气类
    'magneto': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    'ignitionCoil': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    'sparkPlug': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    'rectifier': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'headlight': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'taillight': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'turnSignal': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'meter': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'horn': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'flasher': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'handlebarSwitch': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'killSwitch': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',

    // 制动类
    'frontBrakePad': 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&q=80',
    'rearBrakePad': 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&q=80',
    'brakeShoe': 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&q=80',
    'brakePump': 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&q=80',
    'clutchLever': 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&q=80',
    'brakeLever': 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&q=80',
    'brakeCable': 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&q=80',
    'clutchCable': 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&q=80',
    'brakeMaster': 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&q=80',
    'brakeCaliper': 'https://images.unsplash.com/photo-1558980664-10e7170b5df9?w=800&q=80',

    // 传动类
    'driveBelt': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'variatorRoller': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'clutchBell': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'clutch': 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&q=80',
    'drivePulley': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'drivenPulley': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'chain': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'chainConnector': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'throttleCable': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    'throttleGrip': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',

    // 外观件
    'frontFender': 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80',
    'rearFender': 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80',
    'fairing': 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80',
    'rearviewMirror': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&q=80',
    'seat': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&q=80',
    'fuelCap': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&q=80',
    'sideCover': 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80',
    'footpeg': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&q=80',
    'footboard': 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?w=800&q=80',
    'licensePlateLight': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80'
};

// 文件名映射（部分配件已有页面）
const FILE_EXISTS_MAP = {
    // 已有页面
    'sparkPlug': { base: 'spark-plug.html', brands: ['ngk'] },
    'chain': { base: 'chain.html', brands: ['did'] },

    // 已有品牌变体
    'sparkPlug_bosch': 'spark-plug-bosch.html',
    'sparkPlug_denso': 'spark-plug-denso.html',
    'chain_gates': 'chain-gates.html',
    'frontBrakePad_brembo': 'brake-disc-brembo.html',
    'frontShock_sachs': 'shock-absorber-sachs.html',
    'rearShock_kayaba': 'rear-shock-kayaba.html',
    'oilPump_champion': 'oil-pump-champion.html',
    'pistonRing_guggi': 'piston-ring-guggi.html',
    'starterMotor_daido': 'starter-motor-daido.html',
    'brakeShoe_nissan': 'brake-shoe-nissan.html',
    'driveBelt_did': 'drive-belt-did.html',
    'rearviewMirror_showa': 'headlight-showa.html', // 使用同一个文件
    'seat_kenda': 'tire-kenda.html', // 使用同一个文件
    'clutchPlate_jianda': 'clutch-plate-jianda.html',
    'frontFender_csun': 'fairing-csun.html', // 使用同一个文件
    'fairing_csun': 'fairing-csun.html',
    'cylinderBlock_kymco': 'engine-assembly-kymco.html',
    'steeringColumn_nitto': 'frame-nitto.html',
    'meter_kenda': 'tire-kenda.html',
    'battery_yuasa': 'battery-yuasa.html',
    'headlight_showa': 'headlight-showa.html',
    'rearviewMirror_kenda': 'tire-kenda.html',
    'fairing_tucano': 'exhaust-tucano.html',
    'licensePlateLight_kenda': 'tire-kenda.html',
    'taillight_kenda': 'tire-kenda.html',
    'turnSignal_kenda': 'tire-kenda.html',
    'frontFender_tucano': 'exhaust-tucano.html',
    'rearFender_tucano': 'exhaust-tucano.html',
    'sideCover_csun': 'fairing-csun.html',
    'fuelCap_csun': 'fairing-csun.html',
    'seat_tucano': 'exhaust-tucano.html',
    'footpeg_tucano': 'exhaust-tucano.html',
    'footboard_tucano': 'exhaust-tucano.html',
    'rearviewMirror_tucano': 'exhaust-tucano.html',
    'mainStand_tucano': 'exhaust-tucano.html',
    'sideStand_tucano': 'exhaust-tucano.html',
    'sprocket_tucano': 'exhaust-tucano.html',
    'rearSwingarm_tucano': 'exhaust-tucano.html',
    'handlebar_tucano': 'exhaust-tucano.html',
    'handleSwitch_tucano': 'exhaust-tucano.html',
    'handlebarSwitch_tucano': 'exhaust-tucano.html',
    'killSwitch_tucano': 'exhaust-tucano.html',
    'flasher_tucano': 'exhaust-tucano.html',
    'horn_tucano': 'exhaust-tucano.html',
    'rectifier_tucano': 'exhaust-tucano.html',
    'ignitionCoil_tucano': 'exhaust-tucano.html',
    'magneto_tucano': 'exhaust-tucano.html',
    'generator_tucano': 'exhaust-tucano.html',
    'crankshaft_tucano': 'exhaust-tucano.html',
    'camshaft_tucano': 'exhaust-tucano.html',
    'valveGuide_tucano': 'exhaust-tucano.html',
    'connectingRod_tucano': 'exhaust-tucano.html',
    'waterPump_tucano': 'exhaust-tucano.html',
    'carburetor_mikuni': 'carburetor-mikuni.html',
    'clutchLever_tucano': 'exhaust-tucano.html',
    'brakeLever_tucano': 'exhaust-tucano.html',
    'brakeCable_tucano': 'exhaust-tucano.html',
    'clutchCable_tucano': 'exhaust-tucano.html',
    'brakeMaster_tucano': 'exhaust-tucano.html',
    'brakeCaliper_tucano': 'exhaust-tucano.html',
    'rearBrakePad_tucano': 'exhaust-tucano.html',
    'variatorRoller_tucano': 'exhaust-tucano.html',
    'clutchBell_tucano': 'exhaust-tucano.html',
    'clutch_tucano': 'exhaust-tucano.html',
    'drivePulley_tucano': 'exhaust-tucano.html',
    'drivenPulley_tucano': 'exhaust-tucano.html',
    'chainConnector_tucano': 'exhaust-tucano.html',
    'throttleCable_tucano': 'exhaust-tucano.html',
    'throttleGrip_tucano': 'exhaust-tucano.html',
    'frontFork_tucano': 'exhaust-tucano.html',
    'rearFender_csun': 'fairing-csun.html',

    // 轮胎已有
    'tire_cmt': 'tire-cmt.html',
    'tire_kenda': 'tire-kenda.html',
    'tire_csun': 'tire-cmt.html',
    'tire_tucano': 'tire-kenda.html',
    'tire_gates': 'tire-kenda.html',
    'tire_brembo': 'tire-kenda.html',

    // 排气管已有
    'exhaust_tucano': 'exhaust-tucano.html'
};

function generatePage(partKey, brand, partData) {
    const category = CATEGORY_MAP[partKey];
    const categoryInfo = CATEGORY_INFO[category];
    const fileName = `${partKey}-${brand.code}.html`;
    const imageUrl = IMAGE_MAP[partKey] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80';

    const discount = Math.round((brand.price / brand.retailPrice) * 10) / 10;
    const discountText = `${Math.round(discount * 10)}折`;
    const stock = Math.floor(Math.random() * 500) + 50;
    const sales = Math.floor(Math.random() * 2000) + 500;
    const shopScore = (Math.random() * 0.2 + 4.7).toFixed(1);

    const specs = generateSpecs(partKey, partData, brand);
    const models = generateModels(partKey);
    const detailContent = generateDetailContent(partKey, partData, brand);

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>【${brand.name}】摩托车${partData.name} ${partData.model} ${brand.origin}</title>
    <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header { background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.08); position: sticky; top: 0; z-index: 100; }
        .header-content { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; max-width: 1200px; margin: 0 auto; }
        .logo { font-size: 24px; font-weight: bold; color: #e2231a; }
        .breadcrumb { padding: 15px 0; font-size: 13px; color: #999; }
        .breadcrumb a { color: #666; text-decoration: none; }
        .breadcrumb a:hover { color: #e2231a; }
        .breadcrumb span { margin: 0 8px; }
        .product-main { background: #fff; border-radius: 8px; padding: 30px; margin-bottom: 20px; }
        .product-container { display: grid; grid-template-columns: 450px 1fr; gap: 40px; }
        .product-gallery { position: relative; }
        .main-image { width: 450px; height: 450px; border: 1px solid #eee; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #fff; }
        .main-image img { width: 100%; height: 100%; object-fit: contain; }
        .product-badge { position: absolute; top: 15px; left: 15px; background: ${brand.color}; color: #fff; padding: 5px 15px; border-radius: 3px; font-size: 12px; }
        .thumbnail-list { display: flex; gap: 10px; margin-top: 15px; }
        .thumbnail { width: 60px; height: 60px; border: 2px solid #ddd; border-radius: 4px; cursor: pointer; overflow: hidden; }
        .thumbnail:hover, .thumbnail.active { border-color: #e2231a; }
        .thumbnail img { width: 100%; height: 100%; object-fit: cover; }
        .product-info h1 { font-size: 24px; font-weight: 600; color: #333; margin-bottom: 15px; line-height: 1.4; }
        .product-subtitle { font-size: 14px; color: #999; margin-bottom: 20px; }
        .product-summary { background: #fff8f5; padding: 20px; border-radius: 8px; margin-bottom: 25px; }
        .summary-row { display: flex; margin-bottom: 10px; font-size: 14px; }
        .summary-label { color: #999; width: 80px; }
        .summary-value { color: #333; }
        .price-section { background: linear-gradient(135deg, #fff5f5 0%, #fff0f0 100%); padding: 20px; border-radius: 8px; margin-bottom: 25px; }
        .price-label { font-size: 14px; color: #999; margin-bottom: 5px; }
        .price-main { display: flex; align-items: baseline; gap: 20px; }
        .price-current { font-size: 36px; font-weight: bold; color: #e2231a; }
        .price-unit { font-size: 14px; color: #e2231a; }
        .price-original { font-size: 16px; color: #999; text-decoration: line-through; }
        .price-discount { background: #e2231a; color: #fff; padding: 3px 8px; border-radius: 3px; font-size: 12px; margin-left: 10px; }
        .spec-section { margin-bottom: 25px; }
        .spec-title { font-size: 16px; font-weight: 600; color: #333; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
        .spec-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .spec-item { font-size: 14px; }
        .spec-item .spec-label { color: #999; }
        .spec-item .spec-value { color: #333; margin-left: 5px; }
        .select-section { margin-bottom: 25px; }
        .select-label { font-size: 14px; color: #999; margin-bottom: 10px; }
        .select-options { display: flex; flex-wrap: wrap; gap: 10px; }
        .select-option { padding: 10px 20px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; font-size: 14px; transition: all 0.3s; }
        .select-option:hover { border-color: #e2231a; }
        .select-option.active { border-color: #e2231a; background: #fff0f0; color: #e2231a; }
        .quantity-section { display: flex; align-items: center; margin-bottom: 25px; }
        .quantity-input { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 4px; overflow: hidden; }
        .quantity-btn { width: 40px; height: 40px; border: none; background: #f5f5f5; cursor: pointer; font-size: 18px; }
        .quantity-btn:hover { background: #eee; }
        .quantity-num { width: 60px; height: 40px; border: none; border-left: 1px solid #ddd; border-right: 1px solid #ddd; text-align: center; font-size: 16px; }
        .stock-info { margin-left: 20px; font-size: 14px; color: #999; }
        .stock-num { color: #19c46c; font-weight: 600; }
        .action-buttons { display: flex; gap: 15px; margin-bottom: 30px; }
        .btn-buy { flex: 1; padding: 15px 40px; background: #e2231a; color: #fff; border: none; border-radius: 4px; font-size: 18px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .btn-buy:hover { background: #c81e1a; }
        .btn-cart { padding: 15px 40px; background: #ffddcc; color: #e2231a; border: 1px solid #e2231a; border-radius: 4px; font-size: 18px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .btn-cart:hover { background: #ffe4d9; }
        .service-promise { display: flex; gap: 30px; padding: 20px 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee; }
        .promise-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #999; }
        .promise-item i { color: #19c46c; }
        .shop-section { background: #fff; border-radius: 8px; padding: 25px; margin-bottom: 20px; }
        .shop-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .shop-name { font-size: 18px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 10px; }
        .shop-name i { color: ${brand.color}; }
        .shop-stats { display: flex; gap: 30px; font-size: 13px; color: #666; }
        .shop-stats span { color: #e2231a; font-weight: 600; }
        .product-detail { background: #fff; border-radius: 8px; padding: 30px; margin-bottom: 20px; }
        .detail-tabs { display: flex; border-bottom: 2px solid #e2231a; margin-bottom: 30px; }
        .detail-tab { padding: 15px 30px; font-size: 16px; color: #666; cursor: pointer; border-bottom: 3px solid transparent; margin-bottom: -2px; }
        .detail-tab.active { color: #e2231a; border-bottom-color: #e2231a; font-weight: 600; }
        .detail-content { font-size: 14px; line-height: 1.8; color: #666; }
        .detail-content p { margin-bottom: 15px; }
        .detail-content h3 { font-size: 16px; color: #333; margin: 25px 0 15px; }
        .detail-content ul { margin-left: 20px; margin-bottom: 15px; }
        .detail-content li { margin-bottom: 8px; }
        .param-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .param-table th, .param-table td { padding: 12px 15px; border: 1px solid #eee; text-align: left; font-size: 14px; }
        .param-table th { background: #fafafa; color: #999; width: 120px; }
        .param-table td { color: #666; }
        .recommend-section { background: #fff; border-radius: 8px; padding: 30px; margin-bottom: 20px; }
        .recommend-title { font-size: 18px; font-weight: 600; color: #333; margin-bottom: 20px; }
        .recommend-list { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .recommend-item { text-decoration: none; color: inherit; }
        .recommend-img { width: 100%; height: 180px; background: #f8f8f8; border-radius: 8px; overflow: hidden; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; }
        .recommend-img img { width: 90%; height: 90%; object-fit: contain; }
        .recommend-name { font-size: 13px; color: #333; line-height: 1.4; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .recommend-price { font-size: 16px; color: #e2231a; font-weight: 600; }
        .footer { background: #fff; padding: 30px 0; margin-top: 30px; border-top: 1px solid #eee; }
        .footer-content { text-align: center; font-size: 13px; color: #999; }
        .footer a { color: #666; text-decoration: none; margin: 0 10px; }
        .footer a:hover { color: #e2231a; }
        .service-float { position: fixed; right: 20px; bottom: 100px; display: flex; flex-direction: column; gap: 10px; }
        .service-btn { width: 50px; height: 50px; background: #e2231a; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; box-shadow: 0 4px 12px rgba(226,35,26,0.3); transition: all 0.3s; }
        .service-btn:hover { transform: scale(1.1); }
        @media (max-width: 768px) {
            .product-container { grid-template-columns: 1fr; }
            .main-image { width: 100%; height: 300px; }
            .recommend-list { grid-template-columns: repeat(2, 1fr); }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-content">
            <div class="logo"><i class="fas fa-motorcycle"></i> 摩托配件商城</div>
        </div>
    </div>

    <div class="container">
        <div class="breadcrumb">
            <a href="index.html">首页</a><span>></span>
            <a href="#">摩托车配件</a><span>></span>
            <a href="#">${categoryInfo.path}</a><span>></span>
            <span>${brand.name}${partData.name}</span>
        </div>

        <div class="product-main">
            <div class="product-container">
                <div class="product-gallery">
                    <div class="main-image">
                        <img src="${imageUrl}" alt="${brand.name}${partData.name}">
                    </div>
                    <div class="thumbnail-list">
                        <div class="thumbnail active">
                            <img src="${imageUrl}" alt="${partData.name}正面">
                        </div>
                        <div class="thumbnail">
                            <img src="${imageUrl.replace('w=800', 'w=200')}" alt="${partData.name}细节">
                        </div>
                        <div class="thumbnail">
                            <img src="${imageUrl.replace('w=800', 'w=200')}" alt="${partData.name}包装">
                        </div>
                        <div class="thumbnail">
                            <img src="${imageUrl.replace('w=800', 'w=200')}" alt="${partData.name}应用">
                        </div>
                    </div>
                    <div class="product-badge">${brand.name}原装</div>
                </div>

                <div class="product-info">
                    <h1>【${brand.name}原装】摩托车${partData.name} ${partData.model} ${brand.origin}品质</h1>
                    <p class="product-subtitle">${partData.spec} | ${brand.origin}原产 | ${partData.unit}</p>

                    <div class="product-summary">
                        <div class="summary-row">
                            <span class="summary-label">服务</span>
                            <span class="summary-value">由"${brand.name}配件专营店"发货并提供售后服务</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">配送</span>
                            <span class="summary-value">预计2-4个工作日送达 | 运费：免运费</span>
                        </div>
                        <div class="summary-row">
                            <span class="summary-label">销量</span>
                            <span class="summary-value">累计月销 ${sales.toLocaleString()} 件</span>
                        </div>
                    </div>

                    <div class="price-section">
                        <div class="price-label">价格</div>
                        <div class="price-main">
                            <span class="price-current">¥${brand.price}</span>
                            <span class="price-unit">元</span>
                            <span class="price-original">¥${brand.retailPrice}</span>
                            <span class="price-discount">${discountText}</span>
                        </div>
                    </div>

                    <div class="spec-section">
                        <div class="spec-title">规格参数</div>
                        <div class="spec-grid">
                            ${specs}
                        </div>
                    </div>

                    ${models.length > 0 ? `
                    <div class="select-section">
                        <div class="select-label">选择型号</div>
                        <div class="select-options">
                            ${models.map((m, i) => `<div class="select-option ${i === 0 ? 'active' : ''}">${m}</div>`).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <div class="select-section">
                        <div class="select-label">购买数量</div>
                        <div class="select-options">
                            <div class="select-option active">单${partData.unit}</div>
                            <div class="select-option">两${partData.unit}(-¥${Math.floor(brand.price * 0.05)})</div>
                            <div class="select-option">五${partData.unit}(-¥${Math.floor(brand.price * 0.12)})</div>
                        </div>
                    </div>

                    <div class="quantity-section">
                        <div class="quantity-label" style="font-size:14px;color:#999;margin-right:15px;">数量</div>
                        <div class="quantity-input">
                            <button class="quantity-btn">-</button>
                            <input type="text" class="quantity-num" value="1">
                            <button class="quantity-btn">+</button>
                        </div>
                        <span class="stock-info">库存：<span class="stock-num">${stock}</span> 件</span>
                    </div>

                    <div class="action-buttons">
                        <button class="btn-buy">立即购买</button>
                        <button class="btn-cart"><i class="fas fa-shopping-cart"></i> 加入购物车</button>
                    </div>

                    <div class="service-promise">
                        <div class="promise-item"><i class="fas fa-check-circle"></i> ${brand.name}正品</div>
                        <div class="promise-item"><i class="fas fa-check-circle"></i> ${brand.origin}品质</div>
                        <div class="promise-item"><i class="fas fa-check-circle"></i> 7天无理由</div>
                        <div class="promise-item"><i class="fas fa-check-circle"></i> 品质保障</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="shop-section">
            <div class="shop-header">
                <div class="shop-name">
                    <i class="fas fa-store"></i> ${brand.name}配件专营店
                </div>
                <div class="shop-stats">
                    <div>商品评分 <span>${shopScore}</span></div>
                    <div>服务态度 <span>4.9</span></div>
                    <div>发货速度 <span>4.8</span></div>
                </div>
            </div>
        </div>

        <div class="product-detail">
            <div class="detail-tabs">
                <div class="detail-tab active">商品详情</div>
                <div class="detail-tab">规格参数</div>
                <div class="detail-tab">适用车型</div>
                <div class="detail-tab">安装指南</div>
            </div>

            <div class="detail-content">
                ${detailContent}
            </div>
        </div>

        <div class="recommend-section">
            <div class="recommend-title">猜你喜欢</div>
            <div class="recommend-list">
                <a href="index.html" class="recommend-item">
                    <div class="recommend-img"><img src="${imageUrl}" alt="配件"></div>
                    <div class="recommend-name">摩托车${partData.name}精选配件</div>
                    <div class="recommend-price">¥${brand.price}</div>
                </a>
                ${categoryInfo.relatedFiles.slice(0, 4).map(f => `
                <a href="${f}" class="recommend-item">
                    <div class="recommend-img"><img src="${imageUrl.replace('w=800', 'w=300')}" alt="配件"></div>
                    <div class="recommend-name">摩托车${partData.name}更多选择</div>
                    <div class="recommend-price">¥${Math.floor(brand.price * (0.8 + Math.random() * 0.4))}</div>
                </a>`).join('')}
            </div>
        </div>
    </div>

    <div class="service-float">
        <div class="service-btn"><i class="fas fa-comments"></i></div>
    </div>

    <div class="footer">
        <div class="footer-content">
            <a href="#">关于我们</a>|
            <a href="#">联系我们</a>|
            <a href="#">商家入驻</a>|
            <a href="#">帮助中心</a>|
            <a href="#">Copyright © 2024 摩托配件商城</a>
        </div>
    </div>

    <script>
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', function() {
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const imgSrc = this.querySelector('img').src.replace('w=200', 'w=800');
                document.querySelector('.main-image img').src = imgSrc;
            });
        });

        document.querySelectorAll('.select-option').forEach(option => {
            option.addEventListener('click', function() {
                this.parentElement.querySelectorAll('.select-option').forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });

        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.parentElement.querySelector('.quantity-num');
                let num = parseInt(input.value);
                if (this.textContent === '+') {
                    num = Math.min(num + 1, 99);
                } else {
                    num = Math.max(num - 1, 1);
                }
                input.value = num;
            });
        });
    </script>
</body>
</html>`;
}

function generateSpecs(partKey, partData, brand) {
    const specsMap = {
        // 发动机类
        pistonRing: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: `${partData.model}` },
            { label: '材质', value: '优质合金钢' },
            { label: '规格', value: partData.spec },
            { label: '适用', value: partData.spec },
            { label: '保修期', value: '6个月' }
        ],
        cylinderBlock: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '材质', value: '铝合金' },
            { label: '表面处理', value: '阳极氧化' },
            { label: '保修期', value: '12个月' }
        ],
        crankshaft: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '材质', value: '高强度钢' },
            { label: '动平衡', value: '精密校准' },
            { label: '保修期', value: '12个月' }
        ],
        camshaft: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '材质', value: '合金钢' },
            { label: '热处理', value: '渗碳淬火' },
            { label: '保修期', value: '6个月' }
        ],
        valveGuide: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '内径', value: partData.spec },
            { label: '材质', value: '青铜' },
            { label: '长度', value: '35mm' },
            { label: '保修期', value: '无（消耗品）' }
        ],
        connectingRod: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '材质', value: '锻铝合金' },
            { label: '连杆长度', value: '标准' },
            { label: '保修期', value: '12个月' }
        ],
        oilPump: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '类型', value: '转子泵' },
            { label: '工作压力', value: '3-5bar' },
            { label: '保修期', value: '6个月' }
        ],
        waterPump: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '类型', value: '离心式' },
            { label: '叶轮材质', value: '铝合金' },
            { label: '保修期', value: '12个月' }
        ],
        carburetor: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '类型', value: '真空膜片式' },
            { label: '主喷嘴', value: '#120' },
            { label: '保修期', value: '6个月' }
        ],
        clutchPlate: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '类型', value: '湿式多片' },
            { label: '摩擦系数', value: '高' },
            { label: '保修期', value: '无（消耗品）' }
        ],
        starterMotor: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '电压', value: '12V' },
            { label: '功率', value: '0.8kW' },
            { label: '保修期', value: '12个月' }
        ],
        generator: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '输出', value: '12V 15A' },
            { label: '类型', value: '磁电机' },
            { label: '保修期', value: '12个月' }
        ],

        // 车架类
        frontShock: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '类型', value: '液压弹簧' },
            { label: '行程', value: '120mm' },
            { label: '保修期', value: '12个月' }
        ],
        rearShock: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '类型', value: '油气混合' },
            { label: '弹簧预载', value: '可调' },
            { label: '保修期', value: '12个月' }
        ],
        handlebar: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '材质', value: partData.model },
            { label: '直径', value: partData.spec },
            { label: '宽度', value: '720mm' },
            { label: '表面处理', value: '阳极氧化' },
            { label: '保修期', value: '6个月' }
        ],
        steeringColumn: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '类型', value: '轴承式' },
            { label: '材质', value: '钢材' },
            { label: '保修期', value: '12个月' }
        ],
        mainStand: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '材质', value: '钢材' },
            { label: '表面处理', value: '电泳涂装' },
            { label: '保修期', value: '6个月' }
        ],
        sideStand: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '材质', value: '钢材' },
            { label: '弹簧', value: '不锈钢' },
            { label: '保修期', value: '6个月' }
        ],
        sprocket: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '齿数', value: partData.model },
            { label: '链条规格', value: partData.spec },
            { label: '材质', value: '高强度钢' },
            { label: '表面处理', value: '淬火处理' },
            { label: '保修期', value: '6个月' }
        ],
        rearSwingarm: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '材质', value: '铝合金' },
            { label: '长度', value: '标准' },
            { label: '保修期', value: '12个月' }
        ],
        frontFork: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '类型', value: '液压阻尼' },
            { label: '内管直径', value: '31mm' },
            { label: '保修期', value: '12个月' }
        ],
        handleSwitch: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '电压', value: '12V' },
            { label: '防水', value: 'IP67' },
            { label: '保修期', value: '6个月' }
        ],

        // 电气类
        magneto: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '输出', value: '12V AC' },
            { label: '触发方式', value: '磁脉冲' },
            { label: '保修期', value: '12个月' }
        ],
        ignitionCoil: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '电压', value: '12V' },
            { label: '输出电压', value: '30kV' },
            { label: '保修期', value: '12个月' }
        ],
        sparkPlug: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '热值', value: '标准' },
            { label: '间隙', value: '0.8mm' },
            { label: '螺纹', value: 'M10×1.0' },
            { label: '保修期', value: '无（消耗品）' }
        ],
        rectifier: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '电压', value: partData.spec },
            { label: '电流', value: '5A' },
            { label: '类型', value: '全波整流' },
            { label: '保修期', value: '12个月' }
        ],
        headlight: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '功率', value: partData.spec },
            { label: '电压', value: '12V' },
            { label: '类型', value: '卤素/H4' },
            { label: '保修期', value: '6个月' }
        ],
        taillight: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '类型', value: partData.spec },
            { label: '电压', value: '12V' },
            { label: '刹车灯', value: 'LED' },
            { label: '保修期', value: '6个月' }
        ],
        turnSignal: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '功率', value: partData.spec },
            { label: '电压', value: '12V' },
            { label: '颜色', value: '琥珀色' },
            { label: '保修期', value: '6个月' }
        ],
        meter: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '类型', value: partData.spec },
            { label: '显示', value: '机械指针+数字' },
            { label: '背光', value: 'LED' },
            { label: '保修期', value: '12个月' }
        ],
        horn: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '电压', value: partData.spec },
            { label: '音量', value: '105dB' },
            { label: '类型', value: partData.spec },
            { label: '保修期', value: '12个月' }
        ],
        flasher: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '电压', value: partData.spec },
            { label: '频率', value: '90次/分' },
            { label: '接头', value: '3针' },
            { label: '保修期', value: '12个月' }
        ],
        handlebarSwitch: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '电压', value: '12V' },
            { label: '功能', value: '左右套装' },
            { label: '保修期', value: '6个月' }
        ],
        killSwitch: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '电压', value: partData.spec },
            { label: '类型', value: '熄火开关' },
            { label: '防水', value: 'IP67' },
            { label: '保修期', value: '6个月' }
        ],

        // 制动类
        frontBrakePad: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '适用', value: partData.spec },
            { label: '类型', value: '半金属' },
            { label: '摩擦系数', value: '高' },
            { label: '保修期', value: '无（消耗品）' }
        ],
        rearBrakePad: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '适用', value: partData.spec },
            { label: '类型', value: '有机质' },
            { label: '摩擦系数', value: '中' },
            { label: '保修期', value: '无（消耗品）' }
        ],
        brakeShoe: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '类型', value: '鼓式刹车' },
            { label: '材质', value: '有机质' },
            { label: '保修期', value: '无（消耗品）' }
        ],
        brakePump: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '类型', value: partData.spec },
            { label: '孔径', value: '14mm' },
            { label: '材质', value: '铝合金' },
            { label: '保修期', value: '12个月' }
        ],
        clutchLever: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '材质', value: partData.model },
            { label: '类型', value: partData.spec },
            { label: '长度', value: '标准' },
            { label: '颜色', value: '银色/黑色' },
            { label: '保修期', value: '6个月' }
        ],
        brakeLever: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '材质', value: partData.model },
            { label: '直径', value: partData.spec },
            { label: '位置', value: '右手' },
            { label: '颜色', value: '银色/黑色' },
            { label: '保修期', value: '6个月' }
        ],
        brakeCable: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '长度', value: '标准' },
            { label: '材质', value: '钢丝+ PVC' },
            { label: '保修期', value: '6个月' }
        ],
        clutchCable: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '长度', value: '标准' },
            { label: '材质', value: '钢丝+ PVC' },
            { label: '保修期', value: '6个月' }
        ],
        brakeMaster: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '类型', value: '液压' },
            { label: '材质', value: '铝合金' },
            { label: '保修期', value: '12个月' }
        ],
        brakeCaliper: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '类型', value: '浮动式' },
            { label: '活塞数', value: '2活塞' },
            { label: '保修期', value: '12个月' }
        ],

        // 传动类
        driveBelt: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '类型', value: 'V型皮带' },
            { label: '材质', value: '聚氨酯' },
            { label: '保修期', value: '6个月' }
        ],
        variatorRoller: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '重量', value: partData.model },
            { label: '尺寸', value: partData.spec },
            { label: '材质', value: '复合材质' },
            { label: '数量', value: '6个/套' },
            { label: '保修期', value: '无（消耗品）' }
        ],
        clutchBell: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '类型', value: '碗形' },
            { label: '材质', value: '压铸铝' },
            { label: '保修期', value: '12个月' }
        ],
        clutch: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '类型', value: '干式离心' },
            { label: '材质', value: '钢板+摩擦片' },
            { label: '保修期', value: '6个月' }
        ],
        drivePulley: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '类型', value: '主动轮' },
            { label: '材质', value: '铝合金' },
            { label: '保修期', value: '12个月' }
        ],
        drivenPulley: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '类型', value: '从动轮' },
            { label: '材质', value: '铝合金' },
            { label: '保修期', value: '12个月' }
        ],
        chain: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '规格', value: partData.model },
            { label: '节数', value: partData.spec },
            { label: '类型', value: '油封链' },
            { label: '拉伸强度', value: '高' },
            { label: '保修期', value: '6个月' }
        ],
        chainConnector: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '规格', value: partData.model },
            { label: '类型', value: partData.spec },
            { label: '材质', value: '高强度钢' },
            { label: '表面处理', value: '镀锌' },
            { label: '保修期', value: '6个月' }
        ],
        throttleCable: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '长度', value: partData.spec },
            { label: '类型', value: '油门线' },
            { label: '材质', value: '钢丝+ PVC' },
            { label: '保修期', value: '6个月' }
        ],
        throttleGrip: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '直径', value: partData.spec },
            { label: '类型', value: '右手油门' },
            { label: '材质', value: '铝合金+橡胶' },
            { label: '保修期', value: '6个月' }
        ],

        // 外观件
        frontFender: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '材质', value: 'ABS塑料' },
            { label: '表面处理', value: '烤漆' },
            { label: '保修期', value: '6个月' }
        ],
        rearFender: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '材质', value: 'ABS塑料' },
            { label: '表面处理', value: '烤漆' },
            { label: '保修期', value: '6个月' }
        ],
        fairing: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '排量', value: partData.spec },
            { label: '材质', value: 'ABS塑料' },
            { label: '表面处理', value: '原厂烤漆' },
            { label: '保修期', value: '6个月' }
        ],
        rearviewMirror: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '材质', value: partData.model },
            { label: '类型', value: partData.spec },
            { label: '镜面', value: '凸面镜' },
            { label: '视角', value: '120°' },
            { label: '保修期', value: '6个月' }
        ],
        seat: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '材质', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '类型', value: '单座/双座' },
            { label: '防水', value: '是' },
            { label: '保修期', value: '6个月' }
        ],
        fuelCap: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '材质', value: partData.spec },
            { label: '类型', value: '普通/锁盖' },
            { label: '密封', value: 'O型圈' },
            { label: '保修期', value: '6个月' }
        ],
        sideCover: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '规格', value: partData.spec },
            { label: '材质', value: 'ABS塑料' },
            { label: '表面处理', value: '烤漆' },
            { label: '保修期', value: '6个月' }
        ],
        footpeg: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '材质', value: partData.model },
            { label: '类型', value: partData.spec },
            { label: '防滑', value: '是' },
            { label: '安装', value: '原位安装' },
            { label: '保修期', value: '6个月' }
        ],
        footboard: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '材质', value: partData.model },
            { label: '类型', value: partData.spec },
            { label: '防滑', value: '防滑纹' },
            { label: '安装', value: '原位安装' },
            { label: '保修期', value: '6个月' }
        ],
        licensePlateLight: [
            { label: '品牌', value: `${brand.name}（${brand.origin}）` },
            { label: '型号', value: partData.model },
            { label: '电压', value: partData.spec },
            { label: '类型', value: 'LED' },
            { label: '防水', value: 'IP67' },
            { label: '保修期', value: '6个月' }
        ]
    };

    const specs = specsMap[partKey] || [
        { label: '品牌', value: `${brand.name}（${brand.origin}）` },
        { label: '型号', value: partData.model },
        { label: '规格', value: partData.spec },
        { label: '单位', value: partData.unit },
        { label: '保修期', value: '6个月' }
    ];

    return specs.map(s => `<div class="spec-item"><span class="spec-label">${s.label}：</span><span class="spec-value">${s.value}</span></div>`).join('');
}

function generateModels(partKey) {
    const modelsMap = {
        frontBrakePad: ['标准型', '运动型', '赛道型'],
        rearBrakePad: ['标准型', '经济型', '高性能型'],
        sparkPlug: ['标准热值', '高热值', '低热值'],
        tire: ['前轮', '后轮', '前后一套'],
        chain: ['120节', '126节', '132节'],
        driveBelt: ['标准型', '加强型', '竞技型'],
        headlight: ['卤素H4', 'LED', 'HID'],
        taillight: ['普通型', 'LED', '流水灯']
    };
    return modelsMap[partKey] || [];
}

function generateDetailContent(partKey, partData, brand) {
    const features = {
        pistonRing: ['精密加工，间隙均匀', '优质合金钢材质，耐磨耐用', '多层镀铬处理，防锈防腐', '降低机油消耗，提高压缩比'],
        cylinderBlock: ['高强度铝合金材质', '精密镗孔加工', '散热性能优异', '与原厂配件完美匹配'],
        crankshaft: ['整体锻造工艺', '精密动平衡校正', '高强度低重量', '顺滑运转低噪音'],
        camshaft: ['精确的凸轮轮廓', '耐磨合金钢材', '优化的气门正时', '提升发动机性能'],
        frontShock: ['液压阻尼系统', '可调弹簧预载', '舒适的骑行体验', '优秀的路面反馈'],
        sparkPlug: [`${brand.name}原厂制造，品质保证`, '中心电极采用贵金属', '点火能量集中，启动顺畅', '使用寿命长，经济耐用'],
        chain: [`${brand.name}专业链条制造商`, '优质油封设计，防尘防水', '高强度拉力测试', '平顺传动，低噪音'],
        tire: ['运动型胎面设计', '优异的干湿抓地力', '精准的操控性能', 'W速度级别认证']
    };

    const featureList = features[partKey] || [
        `${brand.name}原厂制造，品质保证`,
        `${brand.origin}原装进口`,
        '精密加工，品质卓越',
        '安装方便，兼容性好'
    ];

    return `
        <h3>产品介绍</h3>
        <p>本产品为${brand.name}（${brand.origin}）原装${partData.name}，型号${partData.model}，规格${partData.spec}。${brand.name}是${brand.origin}知名的摩托车配件制造商，以其卓越的品质和可靠性著称。本产品经过严格的质量控制，确保与您的摩托车完美匹配。</p>

        <h3>产品特点</h3>
        <ul>
            ${featureList.map(f => `<li>${f}</li>`).join('')}
        </ul>

        <h3>技术参数</h3>
        <table class="param-table">
            <tr><th>项目</th><th>参数</th></tr>
            <tr><td>品牌</td><td>${brand.name}（${brand.origin}）</td></tr>
            <tr><td>产品名称</td><td>${partData.name}</td></tr>
            <tr><td>型号</td><td>${partData.model}</td></tr>
            <tr><td>规格</td><td>${partData.spec}</td></tr>
            <tr><td>单位</td><td>${partData.unit}</td></tr>
        </table>

        <h3>适用车型</h3>
        <ul>
            <li>本田：CG125/CB400/CBR600RR</li>
            <li>雅马哈：YZF-R6/MT-07/MT-09</li>
            <li>铃木：GSX-R600/GSX250R</li>
            <li>川崎：ZX-6R/Ninja400</li>
            <li>春风：250NK/250SR/400NK</li>
        </ul>

        <h3>安装注意事项</h3>
        <ul>
            <li>建议由专业技师进行安装</li>
            <li>安装前检查配件是否与车型匹配</li>
            <li>按照说明书正确安装</li>
            <li>安装后进行功能测试</li>
        </ul>
    `;
}

// 生成所有页面
function generateAllPages() {
    let count = 0;
    const skipped = [];

    for (const partKey of Object.keys(PARTS_DATA)) {
        const partData = PARTS_DATA[partKey];
        const brands = BRANDS[partKey];

        if (!brands || brands.length === 0) continue;

        for (const brand of brands) {
            const fileName = `${partKey}-${brand.code}.html`;
            const skipKey = `${partKey}_${brand.code}`;

            // 检查是否跳过
            if (FILE_EXISTS_MAP[skipKey]) {
                skipped.push({ partKey, brand: brand.name, reason: '已有对应页面' });
                continue;
            }

            // 检查基础文件是否已存在
            if (FILE_EXISTS_MAP[partKey] && FILE_EXISTS_MAP[partKey].base) {
                const baseFile = FILE_EXISTS_MAP[partKey].base.replace('.html', '');
                if (baseFile === partKey || (FILE_EXISTS_MAP[partKey].brands && FILE_EXISTS_MAP[partKey].brands.includes(brand.code))) {
                    // 这是基础文件或已有品牌
                    continue;
                }
            }

            const html = generatePage(partKey, brand, partData);
            const filePath = path.join(__dirname, fileName);

            try {
                fs.writeFileSync(filePath, html, 'utf8');
                count++;
                console.log(`✓ 生成: ${fileName}`);
            } catch (err) {
                console.error(`✗ 错误: ${fileName} - ${err.message}`);
            }
        }
    }

    console.log(`\n========================================`);
    console.log(`生成完成: ${count} 个页面`);
    console.log(`跳过: ${skipped.length} 个（已有对应页面）`);

    if (skipped.length > 0) {
        console.log(`\n跳过的页面:`);
        skipped.forEach(s => {
            console.log(`  - ${s.partKey} (${s.brand}): ${s.reason}`);
        });
    }
}

generateAllPages();
