import { GAME_FONT } from "../cfg/constants/game-constants";
import { AbstractScene } from "../scenes/AbstractScene";

export class TurtleDetails extends Phaser.GameObjects.Container {
  scene: AbstractScene;

  overlay!: Phaser.GameObjects.Image;

  turtleName!: Phaser.GameObjects.Text;
  id!: Phaser.GameObjects.Text;

  speedTitleText!: Phaser.GameObjects.Text;
  nextScoreLevelTitleText!: Phaser.GameObjects.Text;
  IsRentedTitleText!: Phaser.GameObjects.Text;
  endTimeTitleText!: Phaser.GameObjects.Text;

  speedText!: Phaser.GameObjects.Text;
  nextScoreLevelText!: Phaser.GameObjects.Text;
  IsRentedText!: Phaser.GameObjects.Text;
  endTimeText!: Phaser.GameObjects.Text;

  constructor(scene: AbstractScene, x: number, y: number) {
    super(scene, x, y);
    this.scene = scene;
    this.addOverlay();
    this.addTexts();
    this.scene.add.existing(this);
  }

  private addOverlay() {
    this.overlay = this.scene.add.image(0, 0, 'black_overlay');
    this.overlay.setOrigin(0.5);
    this.overlay.setAlpha(0.15);
    this.overlay.setDisplaySize(
      this.scene.grs.designDim.width * 0.275,
      this.scene.grs.resizeDim.height * 0.25
    );
    this.add(this.overlay);
  }

  private addTexts() {
    const titleConfig = {
      fontFamily: GAME_FONT,
      fontSize: '24px',
      resolution: 3,
      color: '#FFFFFF',
    };

    this.turtleName = this.scene.add.text(0, this.overlay.getTopCenter().y - 36, 'Name of Turtle', titleConfig).setAlign('center').setOrigin(0.5, 0.5);
    this.turtleName.setFontSize(48);
    this.id = this.scene.add.text(this.overlay.getBottomLeft().x + 36, this.overlay.getBottomCenter().y - 30, '#12441535', titleConfig).setAlign('left').setOrigin(0, 0.5);
    this.id.setFontSize(24);

    const titlePosX = this.overlay.getLeftCenter().x + 72;
    const textStartPosY = this.overlay.getLeftCenter().y - 84;

    const textYOffset = 42;

    this.speedTitleText = this.scene.add.text(titlePosX, textStartPosY + textYOffset * 0, 'Speed:', titleConfig).setAlign('left').setOrigin(0, 0.5);
    this.nextScoreLevelTitleText = this.scene.add.text(titlePosX, textStartPosY + textYOffset * 1, 'Next Level Score:', titleConfig).setAlign('left').setOrigin(0, 0.5);
    this.IsRentedTitleText = this.scene.add.text(titlePosX, textStartPosY + textYOffset * 2, 'Is Rented:', titleConfig).setAlign('left').setOrigin(0, 0.5);
    this.endTimeTitleText = this.scene.add.text(titlePosX, textStartPosY + textYOffset * 3, 'LeftSeconds:', titleConfig).setAlign('left').setOrigin(0, 0.5);

    const textPosX = this.overlay.x + 64;

    titleConfig.fontSize = '32px';
    this.speedText = this.scene.add.text(textPosX, textStartPosY + textYOffset * 0, '10', titleConfig).setAlign('center').setOrigin(0.5, 0.5);
    this.nextScoreLevelText = this.scene.add.text(textPosX, textStartPosY + textYOffset * 1, '5500', titleConfig).setAlign('center').setOrigin(0.5, 0.5);
    this.IsRentedText = this.scene.add.text(textPosX, textStartPosY + textYOffset * 2, 'No', titleConfig).setAlign('center').setOrigin(0.5, 0.5);
    this.endTimeText = this.scene.add.text(textPosX, textStartPosY + textYOffset * 3, 'Unlimited', titleConfig).setAlign('center').setOrigin(0.5, 0.5);

    this.add([
      this.turtleName,
      this.id,
      this.speedTitleText,
      this.nextScoreLevelTitleText,
      this.IsRentedTitleText,
      this.endTimeTitleText,
      this.speedText,
      this.nextScoreLevelText,
      this.IsRentedText,
      this.endTimeText
    ]);
  }

  updateTurtleDetails(details: IUserNftWithMetadata) {
    this.turtleName.text = details.metadata.name;
    this.id.text = `${details.tokenId}`;

    const speedAttrib = details.metadata.attributes.find((attrib) => {
      if (attrib.trait_type === 'speed') {
        return true;
      }
    });

    this.speedText.text = `${speedAttrib ? speedAttrib.value : 0}`;
    if (!speedAttrib || typeof speedAttrib.value === "string") {
      this.nextScoreLevelText.text = '9999999999';
    } else {
      this.nextScoreLevelText.text = `${speedAttrib ? this.nextLevelScore(speedAttrib.value) : 9999999999}`
    }


    this.IsRentedText.text = details.rented ? 'Yes' : 'No';
    this.endTimeText.text =  details.rented ? (details.endTime - Math.floor(Date.now() / 1000)).toString() : 'Unlimited';
  }

  nextLevelScore = (speed: number) => {
    if (speed < 12) {
      return (speed + 1) * 400;
    } else if (speed < 15) {
      return 4800 + (speed - 12 + 1) * 3000;
    } else if (speed < 18) {
      return 13800 + (speed - 15 + 1) * 6000;
    } else {
      return 31800 + (speed - 18 + 1) * 12000;
    }
  }
}