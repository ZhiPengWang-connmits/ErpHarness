/**
 * 配件品牌配置数据
 * 基于 DatabaseInitializer.java 中的 PARTS_DATA
 * 每个配件对应多个品牌和不同的价格
 */

// 品牌配置
const BRANDS = {
    // 发动机类品牌
    pistonRing: [
        { name: 'GUGGI古奇', code: 'guggi', color: '#8B4513', origin: '意大利', price: 280, retailPrice: 380 },
        { name: 'NHK', code: 'nhk', color: '#FF6600', origin: '日本', price: 320, retailPrice: 450 },
        { name: 'RING', code: 'ring', color: '#4169E1', origin: '美国', price: 260, retailPrice: 360 }
    ],
    cylinderBlock: [
        { name: 'KYMCO光阳', code: 'kymco', color: '#0066CC', origin: '台湾', price: 2800, retailPrice: 3800 },
        { name: 'SYM三阳', code: 'sym', color: '#FF6600', origin: '台湾', price: 2600, retailPrice: 3500 },
        { name: 'GHM', code: 'ghm', color: '#228B22', origin: '德国', price: 3200, retailPrice: 4500 }
    ],
    crankshaft: [
        { name: 'HOTROD', code: 'hotrod', color: '#8B0000', origin: '美国', price: 680, retailPrice: 980 },
        { name: 'KENSO', code: 'kenso', color: '#FFD700', origin: '马来西亚', price: 520, retailPrice: 720 },
        { name: 'COMETIC', code: 'cometic', color: '#4169E1', origin: '美国', price: 880, retailPrice: 1280 }
    ],
    camshaft: [
        { name: 'HEPCO', code: 'hepco', color: '#228B22', origin: '德国', price: 480, retailPrice: 680 },
        { name: 'KIMPEX', code: 'kimpex', color: '#FF6600', origin: '加拿大', price: 420, retailPrice: 580 },
        { name: 'SPEC', code: 'spec', color: '#8B4513', origin: '美国', price: 560, retailPrice: 780 }
    ],
    valveGuide: [
        { name: 'TRW', code: 'trw', color: '#0066CC', origin: '德国', price: 38, retailPrice: 58 },
        { name: 'MAHLE', code: 'mahle', color: '#228B22', origin: '德国', price: 42, retailPrice: 65 },
        { name: 'FEBi', code: 'febi', color: '#FF6600', origin: '日本', price: 35, retailPrice: 52 }
    ],
    connectingRod: [
        { name: 'HOTROD', code: 'hotrod', color: '#8B0000', origin: '美国', price: 380, retailPrice: 520 },
        { name: 'PROX', code: 'prox', color: '#FFD700', origin: '日本', price: 420, retailPrice: 580 },
        { name: 'WOSSNER', code: 'wossner', color: '#4169E1', origin: '德国', price: 480, retailPrice: 680 }
    ],
    oilPump: [
        { name: 'CHAMPION冠军', code: 'champion', color: '#0066CC', origin: '美国', price: 280, retailPrice: 380 },
        { name: 'MAHLE', code: 'mahle', color: '#228B22', origin: '德国', price: 320, retailPrice: 450 },
        { name: 'WONDERTECH', code: 'wondertech', color: '#FF6600', origin: '意大利', price: 260, retailPrice: 360 }
    ],
    waterPump: [
        { name: 'AISIN', code: 'aisin', color: '#0066CC', origin: '日本', price: 420, retailPrice: 580 },
        { name: 'CLOYES', code: 'cloyes', color: '#FFD700', origin: '美国', price: 380, retailPrice: 520 },
        { name: 'GATES', code: 'gates', color: '#FF6600', origin: '美国', price: 360, retailPrice: 480 }
    ],
    carburetor: [
        { name: 'MIKUNI mikuni', code: 'mikuni', color: '#0066CC', origin: '日本', price: 480, retailPrice: 680 },
        { name: 'KEIHIN', code: 'keihin', color: '#228B22', origin: '日本', price: 520, retailPrice: 720 },
        { name: 'Tillotson', code: 'tillotson', color: '#FF6600', origin: '美国', price: 420, retailPrice: 580 }
    ],
    clutchPlate: [
        { name: 'EBC', code: 'ebc', color: '#FFD700', origin: '英国', price: 320, retailPrice: 450 },
        { name: 'STOMP', code: 'stomp', color: '#228B22', origin: '美国', price: 280, retailPrice: 380 },
        { name: 'NEWFRICTION', code: 'newfriction', color: '#0066CC', origin: '意大利', price: 350, retailPrice: 480 }
    ],
    starterMotor: [
        { name: 'DAIDO电锭', code: 'daido', color: '#0066CC', origin: '日本', price: 380, retailPrice: 520 },
        { name: 'DENSO电装', code: 'denso', color: '#228B22', origin: '日本', price: 420, retailPrice: 580 },
        { name: 'BOSCH', code: 'bosch', color: '#FF6600', origin: '德国', price: 480, retailPrice: 680 }
    ],
    generator: [
        { name: 'NIPPON', code: 'nippon', color: '#0066CC', origin: '日本', price: 680, retailPrice: 980 },
        { name: 'HITACHI', code: 'hitachi', color: '#228B22', origin: '日本', price: 720, retailPrice: 1020 },
        { name: 'DUCATI', code: 'ducati', color: '#FF6600', origin: '意大利', price: 880, retailPrice: 1280 }
    ],

    // 车架类品牌
    frontShock: [
        { name: 'SHOWA昭和', code: 'showa', color: '#0066CC', origin: '日本', price: 1280, retailPrice: 1680 },
        { name: 'KYB', code: 'kyb', color: '#228B22', origin: '日本', price: 1380, retailPrice: 1880 },
        { name: 'SACHS', code: 'sachs', color: '#FFD700', origin: '德国', price: 1580, retailPrice: 2180 }
    ],
    rearShock: [
        { name: 'KAYABA', code: 'kayaba', color: '#228B22', origin: '日本', price: 880, retailPrice: 1280 },
        { name: 'HAGON', code: 'hagon', color: '#8B4513', origin: '英国', price: 1280, retailPrice: 1780 },
        { name: 'ELKA', code: 'elka', color: '#FF6600', origin: '加拿大', price: 1580, retailPrice: 2180 }
    ],
    handlebar: [
        { name: 'NITTO', code: 'nitto', color: '#0066CC', origin: '日本', price: 280, retailPrice: 380 },
        { name: 'PROTAPER', code: 'protaper', color: '#FF6600', origin: '美国', price: 380, retailPrice: 520 },
        { name: 'RENTHAL', code: 'renthal', color: '#FFD700', origin: '英国', price: 420, retailPrice: 580 }
    ],
    steeringColumn: [
        { name: 'NITTO', code: 'nitto', color: '#0066CC', origin: '日本', price: 680, retailPrice: 980 },
        { name: 'KAYABA', code: 'kayaba', color: '#228B22', origin: '日本', price: 720, retailPrice: 1020 },
        { name: 'SHOWA', code: 'showa', color: '#0066CC', origin: '日本', price: 780, retailPrice: 1080 }
    ],
    mainStand: [
        { name: 'KIJIMA', code: 'kijima', color: '#228B22', origin: '日本', price: 180, retailPrice: 260 },
        { name: 'CRM', code: 'crm', color: '#FF6600', origin: '台湾', price: 120, retailPrice: 180 },
        { name: 'GIVI', code: 'givi', color: '#0066CC', origin: '意大利', price: 220, retailPrice: 320 }
    ],
    sideStand: [
        { name: 'KIJIMA', code: 'kijima', color: '#228B22', origin: '日本', price: 80, retailPrice: 120 },
        { name: 'HYPERPRO', code: 'hyperpro', color: '#FFD700', origin: '荷兰', price: 120, retailPrice: 180 },
        { name: 'GIVI', code: 'givi', color: '#0066CC', origin: '意大利', price: 100, retailPrice: 150 }
    ],
    sprocket: [
        { name: 'AFAM', code: 'afam', color: '#228B22', origin: '比利时', price: 180, retailPrice: 260 },
        { name: 'SUNSTAR', code: 'sunstar', color: '#FF6600', origin: '美国', price: 160, retailPrice: 220 },
        { name: 'PBR', code: 'pbr', color: '#0066CC', origin: '日本', price: 200, retailPrice: 280 }
    ],
    rearSwingarm: [
        { name: 'NITTO', code: 'nitto', color: '#0066CC', origin: '日本', price: 1280, retailPrice: 1780 },
        { name: 'GPM', code: 'gpm', color: '#228B22', origin: '台湾', price: 880, retailPrice: 1280 },
        { name: 'HAGON', code: 'hagon', color: '#8B4513', origin: '英国', price: 1680, retailPrice: 2380 }
    ],
    frontFork: [
        { name: 'SHOWA', code: 'showa', color: '#0066CC', origin: '日本', price: 2280, retailPrice: 3280 },
        { name: 'MARZOCCHI', code: 'marzocchi', color: '#FF6600', origin: '意大利', price: 2580, retailPrice: 3580 },
        { name: 'WP', code: 'wp', color: '#FFD700', origin: '奥地利', price: 2880, retailPrice: 4080 }
    ],
    handleSwitch: [
        { name: 'NIPPON', code: 'nippon', color: '#0066CC', origin: '日本', price: 180, retailPrice: 260 },
        { name: 'ODI', code: 'odi', color: '#FF6600', origin: '美国', price: 150, retailPrice: 220 },
        { name: 'RIKISO', code: 'rikiso', color: '#228B22', origin: '台湾', price: 120, retailPrice: 180 }
    ],

    // 电气类品牌
    magneto: [
        { name: 'NIPPON', code: 'nippon', color: '#0066CC', origin: '日本', price: 580, retailPrice: 820 },
        { name: 'KOKUSAN', code: 'kokusan', color: '#228B22', origin: '日本', price: 620, retailPrice: 880 },
        { name: 'SHINDENGEN', code: 'shindengen', color: '#FF6600', origin: '日本', price: 680, retailPrice: 980 }
    ],
    ignitionCoil: [
        { name: 'NGK', code: 'ngk', color: '#228B22', origin: '日本', price: 128, retailPrice: 188 },
        { name: 'BOSCH', code: 'bosch', color: '#FF6600', origin: '德国', price: 98, retailPrice: 148 },
        { name: 'DENSO', code: 'denso', color: '#0066CC', origin: '日本', price: 88, retailPrice: 128 }
    ],
    sparkPlug: [
        { name: 'NGK', code: 'ngk', color: '#228B22', origin: '日本', price: 68, retailPrice: 88 },
        { name: 'BOSCH', code: 'bosch', color: '#FF6600', origin: '德国', price: 48, retailPrice: 68 },
        { name: 'DENSO', code: 'denso', color: '#0066CC', origin: '日本', price: 38, retailPrice: 52 }
    ],
    rectifier: [
        { name: 'SHINDENGEN', code: 'shindengen', color: '#FF6600', origin: '日本', price: 180, retailPrice: 260 },
        { name: 'KOKUSAN', code: 'kokusan', color: '#228B22', origin: '日本', price: 150, retailPrice: 220 },
        { name: 'RICKY', code: 'ricky', color: '#0066CC', origin: '台湾', price: 88, retailPrice: 128 }
    ],
    headlight: [
        { name: 'SHOWA', code: 'showa', color: '#0066CC', origin: '日本', price: 320, retailPrice: 450 },
        { name: 'PHILIPS', code: 'philips', color: '#FFD700', origin: '荷兰', price: 280, retailPrice: 380 },
        { name: 'OSRAM', code: 'osram', color: '#228B22', origin: '德国', price: 350, retailPrice: 480 }
    ],
    taillight: [
        { name: 'LED', code: 'led', color: '#FF0000', origin: '台湾', price: 120, retailPrice: 180 },
        { name: 'CIBIE', code: 'cibie', color: '#FF6600', origin: '法国', price: 180, retailPrice: 260 },
        { name: 'PIAA', code: 'piaa', color: '#0066CC', origin: '日本', price: 220, retailPrice: 320 }
    ],
    turnSignal: [
        { name: 'CREST', code: 'crest', color: '#FF6600', origin: '台湾', price: 48, retailPrice: 72 },
        { name: 'KIJIMA', code: 'kijima', color: '#228B22', origin: '日本', price: 68, retailPrice: 98 },
        { name: 'PIAA', code: 'piaa', color: '#0066CC', origin: '日本', price: 88, retailPrice: 128 }
    ],
    meter: [
        { name: 'NIPPON', code: 'nippon', color: '#0066CC', origin: '日本', price: 680, retailPrice: 980 },
        { name: 'KOSO', code: 'koso', color: '#FF6600', origin: '台湾', price: 480, retailPrice: 680 },
        { name: 'MSTR', code: 'mstr', color: '#228B22', origin: '台湾', price: 580, retailPrice: 820 }
    ],
    horn: [
        { name: 'DENSO', code: 'denso', color: '#228B22', origin: '日本', price: 68, retailPrice: 98 },
        { name: 'FIAMM', code: 'fiamm', color: '#FF6600', origin: '意大利', price: 88, retailPrice: 128 },
        { name: 'HOREX', code: 'horex', color: '#0066CC', origin: '德国', price: 108, retailPrice: 158 }
    ],
    flasher: [
        { name: 'NIPPON', code: 'nippon', color: '#0066CC', origin: '日本', price: 28, retailPrice: 42 },
        { name: 'KOKUSAN', code: 'kokusan', color: '#228B22', origin: '日本', price: 32, retailPrice: 48 },
        { name: 'HELLA', code: 'hella', color: '#FFD700', origin: '德国', price: 45, retailPrice: 65 }
    ],
    handlebarSwitch: [
        { name: 'NIPPON', code: 'nippon', color: '#0066CC', origin: '日本', price: 180, retailPrice: 260 },
        { name: 'KOSO', code: 'koso', color: '#FF6600', origin: '台湾', price: 120, retailPrice: 180 },
        { name: 'RIKISO', code: 'rikiso', color: '#228B22', origin: '台湾', price: 98, retailPrice: 148 }
    ],
    killSwitch: [
        { name: 'NIPPON', code: 'nippon', color: '#0066CC', origin: '日本', price: 38, retailPrice: 58 },
        { name: 'KOSO', code: 'koso', color: '#FF6600', origin: '台湾', price: 28, retailPrice: 42 },
        { name: 'RICKEY', code: 'rickey', color: '#228B22', origin: '台湾', price: 22, retailPrice: 35 }
    ],

    // 制动类品牌
    frontBrakePad: [
        { name: 'BREMBO布雷博', code: 'brembo', color: '#FF0000', origin: '意大利', price: 380, retailPrice: 520 },
        { name: 'EBC', code: 'ebc', color: '#FFD700', origin: '英国', price: 280, retailPrice: 380 },
        { name: 'Ferodo', code: 'ferodo', color: '#0066CC', origin: '英国', price: 320, retailPrice: 450 }
    ],
    rearBrakePad: [
        { name: 'BREMBO', code: 'brembo', color: '#FF0000', origin: '意大利', price: 320, retailPrice: 450 },
        { name: 'SBS', code: 'sbs', color: '#228B22', origin: '丹麦', price: 220, retailPrice: 320 },
        { name: 'CLENT', code: 'clent', color: '#FF6600', origin: '台湾', price: 180, retailPrice: 260 }
    ],
    brakeShoe: [
        { name: 'NISSHINBO', code: 'nisshinbo', color: '#228B22', origin: '日本', price: 88, retailPrice: 128 },
        { name: 'BREMBO', code: 'brembo', color: '#FF0000', origin: '意大利', price: 120, retailPrice: 168 },
        { name: 'FRENZ', code: 'frenz', color: '#0066CC', origin: '澳大利亚', price: 98, retailPrice: 145 }
    ],
    brakePump: [
        { name: 'NISSO', code: 'nisso', color: '#228B22', origin: '日本', price: 180, retailPrice: 260 },
        { name: 'BREMBO', code: 'brembo', color: '#FF0000', origin: '意大利', price: 280, retailPrice: 380 },
        { name: 'SUMITOMO', code: 'sumitomo', color: '#0066CC', origin: '日本', price: 160, retailPrice: 220 }
    ],
    clutchLever: [
        { name: 'BREMBO', code: 'brembo', color: '#FF0000', origin: '意大利', price: 120, retailPrice: 168 },
        { name: 'CRG', code: 'crg', color: '#0066CC', origin: '美国', price: 180, retailPrice: 260 },
        { name: 'ASV', code: 'asv', color: '#228B22', origin: '美国', price: 150, retailPrice: 220 }
    ],
    brakeLever: [
        { name: 'BREMBO', code: 'brembo', color: '#FF0000', origin: '意大利', price: 120, retailPrice: 168 },
        { name: 'CRG', code: 'crg', color: '#0066CC', origin: '美国', price: 180, retailPrice: 260 },
        { name: 'PAINLESS', code: 'painless', color: '#FF6600', origin: '美国', price: 140, retailPrice: 200 }
    ],
    brakeCable: [
        { name: 'NIPPON', code: 'nippon', color: '#0066CC', origin: '日本', price: 28, retailPrice: 42 },
        { name: 'ALLBALLS', code: 'allballs', color: '#FF6600', origin: '美国', price: 35, retailPrice: 52 },
        { name: 'MAGURA', code: 'magura', color: '#228B22', origin: '德国', price: 48, retailPrice: 68 }
    ],
    clutchCable: [
        { name: 'NIPPON', code: 'nippon', color: '#0066CC', origin: '日本', price: 28, retailPrice: 42 },
        { name: 'ALLBALLS', code: 'allballs', color: '#FF6600', origin: '美国', price: 35, retailPrice: 52 },
        { name: 'MAGURA', code: 'magura', color: '#228B22', origin: '德国', price: 48, retailPrice: 68 }
    ],
    brakeMaster: [
        { name: 'BREMBO', code: 'brembo', color: '#FF0000', origin: '意大利', price: 480, retailPrice: 680 },
        { name: 'NISSO', code: 'nisso', color: '#228B22', origin: '日本', price: 380, retailPrice: 520 },
        { name: 'SUMITOMO', code: 'sumitomo', color: '#0066CC', origin: '日本', price: 420, retailPrice: 580 }
    ],
    brakeCaliper: [
        { name: 'BREMBO', code: 'brembo', color: '#FF0000', origin: '意大利', price: 680, retailPrice: 980 },
        { name: 'NISSIN', code: 'nissin', color: '#228B22', origin: '日本', price: 520, retailPrice: 720 },
        { name: 'SUNSTAR', code: 'sunstar', color: '#FF6600', origin: '美国', price: 480, retailPrice: 680 }
    ],

    // 传动类品牌
    driveBelt: [
        { name: 'DID', code: 'did', color: '#228B22', origin: '日本', price: 180, retailPrice: 260 },
        { name: 'GATES', code: 'gates', color: '#FF6600', origin: '美国', price: 150, retailPrice: 220 },
        { name: 'MITSUBOSHI', code: 'mitsuboshi', color: '#0066CC', origin: '日本', price: 168, retailPrice: 240 }
    ],
    variatorRoller: [
        { name: 'POLINI', code: 'polini', color: '#FF6600', origin: '意大利', price: 68, retailPrice: 98 },
        { name: 'HEPTA', code: 'hepta', color: '#228B22', origin: '意大利', price: 58, retailPrice: 85 },
        { name: 'DR PULLEY', code: 'drpully', color: '#0066CC', origin: '日本', price: 78, retailPrice: 110 }
    ],
    clutchBell: [
        { name: 'POLINI', code: 'polini', color: '#FF6600', origin: '意大利', price: 280, retailPrice: 380 },
        { name: 'MALOSSI', code: 'malossi', color: '#228B22', origin: '意大利', price: 320, retailPrice: 450 },
        { name: 'CROW', code: 'crow', color: '#0066CC', origin: '台湾', price: 180, retailPrice: 260 }
    ],
    clutch: [
        { name: 'POLINI', code: 'polini', color: '#FF6600', origin: '意大利', price: 480, retailPrice: 680 },
        { name: 'MALOSSI', code: 'malossi', color: '#228B22', origin: '意大利', price: 520, retailPrice: 720 },
        { name: 'BARNETT', code: 'barnett', color: '#0066CC', origin: '美国', price: 380, retailPrice: 520 }
    ],
    drivePulley: [
        { name: 'POLINI', code: 'polini', color: '#FF6600', origin: '意大利', price: 580, retailPrice: 820 },
        { name: 'HEPTA', code: 'hepta', color: '#228B22', origin: '意大利', price: 520, retailPrice: 720 },
        { name: 'MULLER', code: 'muller', color: '#0066CC', origin: '德国', price: 480, retailPrice: 680 }
    ],
    drivenPulley: [
        { name: 'POLINI', code: 'polini', color: '#FF6600', origin: '意大利', price: 420, retailPrice: 580 },
        { name: 'MALOSSI', code: 'malossi', color: '#228B22', origin: '意大利', price: 480, retailPrice: 680 },
        { name: 'CROW', code: 'crow', color: '#0066CC', origin: '台湾', price: 320, retailPrice: 450 }
    ],
    chain: [
        { name: 'DID', code: 'did', color: '#228B22', origin: '日本', price: 458, retailPrice: 580 },
        { name: 'GATES', code: 'gates', color: '#FF6600', origin: '美国', price: 328, retailPrice: 428 },
        { name: 'RK', code: 'rk', color: '#0066CC', origin: '日本', price: 388, retailPrice: 520 }
    ],
    chainConnector: [
        { name: 'DID', code: 'did', color: '#228B22', origin: '日本', price: 18, retailPrice: 28 },
        { name: 'EK', code: 'ek', color: '#FF6600', origin: '日本', price: 15, retailPrice: 25 },
        { name: 'RK', code: 'rk', color: '#0066CC', origin: '日本', price: 16, retailPrice: 26 }
    ],
    throttleCable: [
        { name: 'NIPPON', code: 'nippon', color: '#0066CC', origin: '日本', price: 38, retailPrice: 58 },
        { name: 'ALLBALLS', code: 'allballs', color: '#FF6600', origin: '美国', price: 45, retailPrice: 68 },
        { name: 'MAGURA', code: 'magura', color: '#228B22', origin: '德国', price: 58, retailPrice: 85 }
    ],
    throttleGrip: [
        { name: 'ODI', code: 'odi', color: '#FF6600', origin: '美国', price: 88, retailPrice: 128 },
        { name: 'PROTAPER', code: 'protaper', color: '#0066CC', origin: '美国', price: 120, retailPrice: 168 },
        { name: 'RENTHAL', code: 'renthal', color: '#FFD700', origin: '英国', price: 98, retailPrice: 145 }
    ],

    // 外观件品牌
    frontFender: [
        { name: 'CSUN旭升', code: 'csun', color: '#0066CC', origin: '台湾', price: 180, retailPrice: 260 },
        { name: 'BAJA', code: 'baja', color: '#228B22', origin: '美国', price: 220, retailPrice: 320 },
        { name: 'PUIG', code: 'puig', color: '#FF6600', origin: '西班牙', price: 280, retailPrice: 380 }
    ],
    rearFender: [
        { name: 'CSUN', code: 'csun', color: '#0066CC', origin: '台湾', price: 160, retailPrice: 220 },
        { name: 'BAJA', code: 'baja', color: '#228B22', origin: '美国', price: 200, retailPrice: 280 },
        { name: 'WINGS', code: 'wings', color: '#FF6600', origin: '意大利', price: 250, retailPrice: 350 }
    ],
    fairing: [
        { name: 'CSUN', code: 'csun', color: '#0066CC', origin: '台湾', price: 2880, retailPrice: 3800 },
        { name: 'STUDIO', code: 'studio', color: '#228B22', origin: '意大利', price: 4580, retailPrice: 5800 },
        { name: 'PUIG', code: 'puig', color: '#FF6600', origin: '西班牙', price: 3280, retailPrice: 4280 }
    ],
    rearviewMirror: [
        { name: 'CRG', code: 'crg', color: '#0066CC', origin: '美国', price: 120, retailPrice: 168 },
        { name: 'RICHEY', code: 'richey', color: '#228B22', origin: '台湾', price: 68, retailPrice: 98 },
        { name: 'GIVI', code: 'givi', color: '#FF6600', origin: '意大利', price: 88, retailPrice: 128 }
    ],
    seat: [
        { name: 'TANAKA', code: 'tanaka', color: '#228B22', origin: '日本', price: 480, retailPrice: 680 },
        { name: 'SPILL', code: 'spill', color: '#0066CC', origin: '意大利', price: 580, retailPrice: 820 },
        { name: 'CORBIN', code: 'corbin', color: '#8B4513', origin: '美国', price: 880, retailPrice: 1280 }
    ],
    fuelCap: [
        { name: 'NITTO', code: 'nitto', color: '#0066CC', origin: '日本', price: 88, retailPrice: 128 },
        { name: 'GIVI', code: 'givi', color: '#FF6600', origin: '意大利', price: 120, retailPrice: 168 },
        { name: 'BAJA', code: 'baja', color: '#228B22', origin: '美国', price: 98, retailPrice: 145 }
    ],
    sideCover: [
        { name: 'CSUN', code: 'csun', color: '#0066CC', origin: '台湾', price: 180, retailPrice: 260 },
        { name: 'STUDIO', code: 'studio', color: '#228B22', origin: '意大利', price: 320, retailPrice: 450 },
        { name: 'BAJA', code: 'baja', color: '#FF6600', origin: '美国', price: 220, retailPrice: 320 }
    ],
    footpeg: [
        { name: 'CRG', code: 'crg', color: '#0066CC', origin: '美国', price: 180, retailPrice: 260 },
        { name: 'ARAI', code: 'arai', color: '#228B22', origin: '日本', price: 220, retailPrice: 320 },
        { name: 'BIKE', code: 'bike', color: '#FF6600', origin: '台湾', price: 120, retailPrice: 180 }
    ],
    footboard: [
        { name: 'GIVI', code: 'givi', color: '#FF6600', origin: '意大利', price: 88, retailPrice: 128 },
        { name: 'BAJA', code: 'baja', color: '#228B22', origin: '美国', price: 68, retailPrice: 98 },
        { name: 'HECTOR', code: 'hector', color: '#0066CC', origin: '台湾', price: 48, retailPrice: 72 }
    ],
    licensePlateLight: [
        { name: 'LED', code: 'led', color: '#FF6600', origin: '台湾', price: 28, retailPrice: 42 },
        { name: 'PIAA', code: 'piaa', color: '#0066CC', origin: '日本', price: 48, retailPrice: 68 },
        { name: 'CIBIE', code: 'cibie', color: '#FFD700', origin: '法国', price: 58, retailPrice: 85 }
    ]
};

// 配件基础数据 (来自 DatabaseInitializer.java)
const PARTS_DATA = {
    // 发动机类
    pistonRing: { code: 'PC2001', name: '活塞环组件', model: '标准型', spec: '四冲程通用', unit: '套' },
    cylinderBlock: { code: 'PC2002', name: '发动机缸体', model: 'CB400', spec: '400cc', unit: '个' },
    crankshaft: { code: 'PC2003', name: '曲轴总成', model: 'CG125', spec: '125cc', unit: '个' },
    camshaft: { code: 'PC2004', name: '凸轮轴', model: 'GY6-125', spec: '125cc', unit: '个' },
    valveGuide: { code: 'PC2005', name: '气门导管', model: '通用型', spec: '6mm', unit: '个' },
    connectingRod: { code: 'PC2006', name: '连杆总成', model: 'CB125T', spec: '125T', unit: '个' },
    oilPump: { code: 'PC2007', name: '机油泵', model: 'GY6-125', spec: '125cc', unit: '个' },
    waterPump: { code: 'PC2008', name: '水泵总成', model: 'CB400', spec: '400cc', unit: '个' },
    carburetor: { code: 'PC2009', name: '化油器总成', model: 'CG125', spec: '125cc', unit: '套' },
    clutchPlate: { code: 'PC2010', name: '离合器片', model: 'CB400', spec: '400cc', unit: '套' },
    starterMotor: { code: 'PC2011', name: '启动电机', model: 'GY6-125', spec: '125cc', unit: '个' },
    generator: { code: 'PC2012', name: '发电机总成', model: 'CB125T', spec: '125T', unit: '个' },

    // 车架类
    frontShock: { code: 'FC3001', name: '前减震器', model: '钻豹', spec: 'KH100', unit: '对' },
    rearShock: { code: 'FC3002', name: '后减震器', model: '五羊款', spec: '125通用', unit: '个' },
    handlebar: { code: 'FC3003', name: '方向把', model: '铝合金', spec: '22mm', unit: '个' },
    steeringColumn: { code: 'FC3004', name: '方向柱', model: 'CG125', spec: '125cc', unit: '套' },
    mainStand: { code: 'FC3005', name: '主支架', model: '五羊款', spec: '125通用', unit: '个' },
    sideStand: { code: 'FC3006', name: '侧支架', model: 'CG125', spec: '125通用', unit: '个' },
    sprocket: { code: 'FC3007', name: '链轮', model: '42齿', spec: '428规格', unit: '个' },
    rearSwingarm: { code: 'FC3008', name: '后平叉', model: '钻豹', spec: 'KH100', unit: '个' },
    frontFork: { code: 'FC3009', name: '前叉总成', model: '太子款', spec: '125通用', unit: '对' },
    handleSwitch: { code: 'FC3010', name: '车把开关', model: 'CG125', spec: '通用', unit: '套' },

    // 电气类
    magneto: { code: 'EC4001', name: '磁电机总成', model: 'CG125', spec: '125cc', unit: '套' },
    ignitionCoil: { code: 'EC4002', name: '点火线圈', model: 'GY6-125', spec: '125cc', unit: '个' },
    sparkPlug: { code: 'EC4003', name: '火花塞', model: 'NGK', spec: 'C7HSA', unit: '个' },
    rectifier: { code: 'EC4004', name: '整流器', model: '12V', spec: '5A', unit: '个' },
    headlight: { code: 'EC4005', name: '大灯总成', model: '钻豹', spec: '35W', unit: '套' },
    taillight: { code: 'EC4006', name: '尾灯总成', model: '五羊款', spec: 'LED', unit: '套' },
    turnSignal: { code: 'EC4007', name: '转向灯', model: '通用', spec: '10W', unit: '对' },
    meter: { code: 'EC4008', name: '仪表总成', model: 'CG125', spec: '机械式', unit: '套' },
    horn: { code: 'EC4009', name: '喇叭', model: '12V', spec: '双音', unit: '个' },
    flasher: { code: 'EC4010', name: '闪光器', model: '12V', spec: '3针', unit: '个' },
    handlebarSwitch: { code: 'EC4011', name: '手把开关', model: 'CG125', spec: '左右套', unit: '套' },
    killSwitch: { code: 'EC4012', name: '熄火开关', model: '通用', spec: '12V', unit: '个' },

    // 制动类
    frontBrakePad: { code: 'BC5001', name: '前刹车片', model: '布雷博', spec: 'GSX250', unit: '对' },
    rearBrakePad: { code: 'BC5002', name: '后刹车片', model: 'BREMBO', spec: 'CB400', unit: '对' },
    brakeShoe: { code: 'BC5003', name: '刹车蹄块', model: '通用', spec: '130规格', unit: '套' },
    brakePump: { code: 'BC5004', name: '刹车泵', model: '日清', spec: '直推式', unit: '个' },
    clutchLever: { code: 'BC5005', name: '离合器手柄', model: '铝合金', spec: '通用', unit: '个' },
    brakeLever: { code: 'BC5006', name: '刹车手柄', model: '铝合金', spec: '22mm', unit: '个' },
    brakeCable: { code: 'BC5007', name: '刹车线', model: 'CG125', spec: '通用', unit: '根' },
    clutchCable: { code: 'BC5008', name: '离合线', model: 'CG125', spec: '通用', unit: '根' },
    brakeMaster: { code: 'BC5009', name: '刹车总泵', model: '日信', spec: '14mm', unit: '个' },
    brakeCaliper: { code: 'BC5010', name: '刹车分泵', model: '日清', spec: '14mm', unit: '个' },

    // 传动类
    driveBelt: { code: 'TC6001', name: '传动皮带', model: '盖茨', spec: 'AV13x950', unit: '根' },
    variatorRoller: { code: 'TC6002', name: '普利珠', model: '12g', spec: '8x14', unit: '套' },
    clutchBell: { code: 'TC6003', name: '碗公', model: 'GY6-125', spec: '125cc', unit: '个' },
    clutch: { code: 'TC6004', name: '离合器', model: 'GY6-125', spec: '125cc', unit: '套' },
    drivePulley: { code: 'TC6005', name: '主动轮', model: 'GY6-125', spec: '125cc', unit: '个' },
    drivenPulley: { code: 'TC6006', name: '从动轮', model: 'GY6-125', spec: '125cc', unit: '个' },
    chain: { code: 'TC6007', name: '链条', model: '428', spec: '120节', unit: '根' },
    chainConnector: { code: 'TC6008', name: '链条接头', model: '428', spec: '通用', unit: '个' },
    throttleCable: { code: 'TC6009', name: '油门线', model: '通用', spec: '1500mm', unit: '根' },
    throttleGrip: { code: 'TC6010', name: '油门把手', model: '通用', spec: '22mm', unit: '个' },

    // 外观件
    frontFender: { code: 'AC7001', name: '前挡泥板', model: '五羊款', spec: '125通用', unit: '个' },
    rearFender: { code: 'AC7002', name: '后挡泥板', model: '钻豹', spec: 'KH100', unit: '个' },
    fairing: { code: 'AC7003', name: '导流罩', model: 'CB400', spec: '400cc', unit: '套' },
    rearviewMirror: { code: 'AC7004', name: '后视镜', model: '铝合金', spec: '通用', unit: '对' },
    seat: { code: 'AC7005', name: '座垫', model: 'PU', spec: '125通用', unit: '个' },
    fuelCap: { code: 'AC7006', name: '油箱盖', model: 'CG125', spec: '金属', unit: '个' },
    sideCover: { code: 'AC7007', name: '侧盖板', model: '五羊款', spec: '125通用', unit: '对' },
    footpeg: { code: 'AC7008', name: '脚蹬', model: '铝合金', spec: '防滑', unit: '对' },
    footboard: { code: 'AC7009', name: '脚踏板', model: '塑料', spec: '通用', unit: '个' },
    licensePlateLight: { code: 'AC7010', name: '牌照灯', model: 'LED', spec: '12V', unit: '个' }
};

// 分类映射
const CATEGORY_MAP = {
    pistonRing: '发动机类', cylinderBlock: '发动机类', crankshaft: '发动机类',
    camshaft: '发动机类', valveGuide: '发动机类', connectingRod: '发动机类',
    oilPump: '发动机类', waterPump: '发动机类', carburetor: '发动机类',
    clutchPlate: '发动机类', starterMotor: '发动机类', generator: '发动机类',

    frontShock: '车架类', rearShock: '车架类', handlebar: '车架类',
    steeringColumn: '车架类', mainStand: '车架类', sideStand: '车架类',
    sprocket: '车架类', rearSwingarm: '车架类', frontFork: '车架类',
    handleSwitch: '车架类',

    magneto: '电气类', ignitionCoil: '电气类', sparkPlug: '电气类',
    rectifier: '电气类', headlight: '电气类', taillight: '电气类',
    turnSignal: '电气类', meter: '电气类', horn: '电气类',
    flasher: '电气类', handlebarSwitch: '电气类', killSwitch: '电气类',

    frontBrakePad: '制动类', rearBrakePad: '制动类', brakeShoe: '制动类',
    brakePump: '制动类', clutchLever: '制动类', brakeLever: '制动类',
    brakeCable: '制动类', clutchCable: '制动类', brakeMaster: '制动类',
    brakeCaliper: '制动类',

    driveBelt: '传动类', variatorRoller: '传动类', clutchBell: '传动类',
    clutch: '传动类', drivePulley: '传动类', drivenPulley: '传动类',
    chain: '传动类', chainConnector: '传动类', throttleCable: '传动类',
    throttleGrip: '传动类',

    frontFender: '外观件', rearFender: '外观件', fairing: '外观件',
    rearviewMirror: '外观件', seat: '外观件', fuelCap: '外观件',
    sideCover: '外观件', footpeg: '外观件', footboard: '外观件',
    licensePlateLight: '外观件'
};

module.exports = { BRANDS, PARTS_DATA, CATEGORY_MAP };
