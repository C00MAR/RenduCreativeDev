interface ColorPalette {
    name: string;
    upperBackground: string;
    lowerBackground: string;
    sphereGradient: {
        light: string;
        medium: string;
        dark: string;
    };
    shadowColor: string;
    lightEffect: {
        start: string;
        mid: string;
        end: string;
    };
}

export default class ColorManager {
    private currentPalette: ColorPalette;
    private readonly palettes: Record<string, ColorPalette>;

    constructor(initialPalette: string = 'purple') {
        this.palettes = {
            purple: {
                name: "Purple Dream",
                upperBackground: '#9370DB',
                lowerBackground: '#E6E6FA',
                sphereGradient: {
                    light: '#B19CD9',
                    medium: '#9370DB',
                    dark: '#8A2BE2'
                },
                shadowColor: 'rgba(103, 58, 183, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            },
            DesertDawn: {
                name: "Desert Dawn",
                upperBackground: '#E1B382', // Sable doré
                lowerBackground: '#DCC7B5', // Sable clair
                sphereGradient: {
                    light: '#EAC696',    // Sable lumineux
                    medium: '#C89666',   // Ocre moyen
                    dark: '#976841'      // Terre d'ombre
                },
                shadowColor: 'rgba(151, 104, 65, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            },
            NeoMint: {
                name: "Neo Mint",
                upperBackground: '#55DDB9', // Menthe vive
                lowerBackground: '#A5ECD7', // Menthe pâle
                sphereGradient: {
                    light: '#7EECD2',    // Menthe claire
                    medium: '#40D6AC',   // Menthe moyenne
                    dark: '#2AAB89'      // Menthe foncée
                },
                shadowColor: 'rgba(42, 171, 137, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            },
            ElectricNight: {
                name: "Electric Night",
                upperBackground: '#2E0259', // Violet nuit profond
                lowerBackground: '#5C2D91', // Violet électrique
                sphereGradient: {
                    light: '#B14AED',    // Violet néon clair
                    medium: '#8332AC',   // Violet néon moyen
                    dark: '#411465'      // Violet néon foncé
                },
                shadowColor: 'rgba(46, 2, 89, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            },
            NordicFrost: {
                name: "Nordic Frost",
                upperBackground: '#C3E0E5', // Bleu glacier
                lowerBackground: '#E5F9FF', // Blanc glacé
                sphereGradient: {
                    light: '#DBF3F8',    // Bleu glace clair
                    medium: '#A5D1D9',   // Bleu glace moyen
                    dark: '#7FB2BC'      // Bleu glace foncé
                },
                shadowColor: 'rgba(127, 178, 188, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            },
            Volcanic: {
                name: "Volcanic",
                upperBackground: '#4A0404', // Rouge volcanique foncé
                lowerBackground: '#690707', // Rouge lave
                sphereGradient: {
                    light: '#FF3B3B',    // Rouge magma clair
                    medium: '#CC0000',   // Rouge magma
                    dark: '#800000'      // Rouge magma foncé
                },
                shadowColor: 'rgba(74, 4, 4, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            },
            GoldenHour: {
                name: "Golden Hour",
                upperBackground: '#FFA41B', // Orange doré
                lowerBackground: '#FFD07F', // Pêche dorée
                sphereGradient: {
                    light: '#FFDB94',    // Or clair
                    medium: '#FFB84C',   // Or moyen
                    dark: '#FF9900'      // Or foncé
                },
                shadowColor: 'rgba(255, 153, 0, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            },
            DeepSpace: {
                name: "Deep Space",
                upperBackground: '#0B0B2B', // Bleu nuit spatial
                lowerBackground: '#1B1B4B', // Bleu cosmos
                sphereGradient: {
                    light: '#4B4BA8',    // Bleu galaxie clair
                    medium: '#2D2D6F',   // Bleu galaxie moyen
                    dark: '#1A1A4F'      // Bleu galaxie foncé
                },
                shadowColor: 'rgba(11, 11, 43, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            },
            ForestMoss: {
                name: "Forest Moss",
                upperBackground: '#2D4F1E', // Vert forêt
                lowerBackground: '#486B37', // Vert mousse
                sphereGradient: {
                    light: '#8FBF7F',    // Vert mousse clair
                    medium: '#5F8F4F',   // Vert mousse moyen
                    dark: '#3F672F'      // Vert mousse foncé
                },
                shadowColor: 'rgba(45, 79, 30, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            },
            CottonCandy: {
                name: "Cotton Candy",
                upperBackground: '#FFB5E8', // Rose bonbon
                lowerBackground: '#FFC9F1', // Rose pastel
                sphereGradient: {
                    light: '#FFE3F8',    // Rose sucré clair
                    medium: '#FFB5E8',   // Rose sucré moyen
                    dark: '#FF8AD8'      // Rose sucré foncé
                },
                shadowColor: 'rgba(255, 181, 232, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            },
            CoffeeBreak: {
                name: "Coffee Break",
                upperBackground: '#4B3832', // Marron café
                lowerBackground: '#6F5643', // Marron latte
                sphereGradient: {
                    light: '#BE9B7B',    // Marron crème
                    medium: '#8B6F4E',   // Marron moyen
                    dark: '#5D4037'      // Marron foncé
                },
                shadowColor: 'rgba(75, 56, 50, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            },
            Cyberpunk: {
                name: "Cyberpunk",
                upperBackground: '#0F1C4D', // Bleu nuit cyber
                lowerBackground: '#1E3B8D', // Bleu électrique
                sphereGradient: {
                    light: '#00FFF0',    // Cyan néon
                    medium: '#00B8E6',   // Cyan électrique
                    dark: '#007A99'      // Cyan profond
                },
                shadowColor: 'rgba(15, 28, 77, 0.3)',
                lightEffect: {
                    start: 'rgba(255, 255, 255, 0.9)',
                    mid: 'rgba(255, 255, 255, 0.3)',
                    end: 'rgba(255, 255, 255, 0)'
                }
            }
        };
        
        this.currentPalette = this.palettes[initialPalette];
    }

    public getCurrentPalette(): ColorPalette {
        return this.currentPalette;
    }

    public getAllPalettes(): Record<string, ColorPalette> {
        return this.palettes;
    }

    public getPaletteNames(): Array<{ key: string; name: string }> {
        return Object.entries(this.palettes).map(([key, palette]) => ({
            key,
            name: palette.name
        }));
    }

    public changePalette(paletteKey: string): void {
        if (this.palettes[paletteKey]) {
            this.currentPalette = this.palettes[paletteKey];
        } else {
            console.error(`Palette ${paletteKey} not found`);
        }
    }

    public drawBackground(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ): void {
        // Upper background
        ctx.fillStyle = this.currentPalette.upperBackground;
        ctx.fillRect(0, 0, width, height / 2);
        
        // Lower background
        ctx.fillStyle = this.currentPalette.lowerBackground;
        ctx.fillRect(0, height / 2, width, height / 2);
    }

    public addPalette(key: string, palette: ColorPalette): void {
        if (this.palettes[key]) {
            console.warn(`Overwriting existing palette: ${key}`);
        }
        this.palettes[key] = palette;
    }

    public getShadowColor(): string {
        return this.currentPalette.shadowColor;
    }

    public getLightEffect(): {
        start: string;
        mid: string;
        end: string;
    } {
        return this.currentPalette.lightEffect;
    }

    public getGradient(): {
        light: string;
        medium: string;
        dark: string;
    } {
        return this.currentPalette.sphereGradient;
    }
}