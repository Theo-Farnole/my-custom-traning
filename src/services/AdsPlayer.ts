
import { AdLoadInfo, AdMob, AdMobBannerSize, AdOptions, BannerAdOptions, BannerAdPluginEvents, BannerAdPosition, BannerAdSize, InterstitialAdPluginEvents, } from "@capacitor-community/admob"


// TESTING ID
const ID_TEST_BANNER = "ca-app-pub-3940256099942544/6300978111";
const ID_TEST_INTERSTITIAL = "ca-app-pub-3940256099942544/1033173712";
const ID_TEST_INTERSTITIAL_VIDEO = "ca-app-pub-3940256099942544/8691691433";

// IDs
const ID_INTER_WORKOUT_ENDED = "ca-app-pub-9484689619220641/2382817960";
const ID_BANNER_WORKOUT_PLAYING = "ca-app-pub-9484689619220641/8795155406";
const ID_pub = "ca-app-pub-9484689619220641~7865217112";

const IS_TESTING = true;

export class AdsPlayer {

    private static _instance: AdsPlayer;
    public static get Instance(): AdsPlayer { return this._instance || (this._instance = new this()); }

    public static async Initialize(): Promise<void> {
        const { status } = await AdMob.trackingAuthorizationStatus();

        if (status === 'notDetermined') {
            /**
             * If you want to explain TrackingAuthorization before showing the iOS dialog,
             * you can show the modal here.
             * ex)
             * const modal = await this.modalCtrl.create({
             *   component: RequestTrackingPage,
             * });
             * await modal.present();
             * await modal.onDidDismiss();  // Wait for close modal
             **/
        }

        AdMob.initialize({
            requestTrackingAuthorization: true,
            testingDevices: ['ce4ed0bd-a022-4e28-8cf7-7dd0871bf849'],
            initializeForTesting: IS_TESTING,
        });
    }

    public static async showBanner_WorkoutPlaying(): Promise<void> {
        const options: BannerAdOptions = {
            adId: IS_TESTING ? ID_TEST_BANNER : ID_BANNER_WORKOUT_PLAYING,
            adSize: BannerAdSize.ADAPTIVE_BANNER,
            position: BannerAdPosition.BOTTOM_CENTER,
            margin: 0,
            isTesting: IS_TESTING,
            // npa: true
        };
        AdMob.showBanner(options);
    }

    public static hideBanner() {
        AdMob.hideBanner();
    }

    public static async prepareInterstitial_WorkoutEnded() {
        const options: AdOptions = {
            adId: IS_TESTING ? ID_TEST_INTERSTITIAL : ID_INTER_WORKOUT_ENDED,
            isTesting: IS_TESTING,
            // npa: true
        };
        await AdMob.prepareInterstitial(options);
    }

    public static async interstitial(): Promise<void> {
        await AdMob.showInterstitial();
    }

    public async ShowWorkoutEnded() {
        throw "not implemented";
    }
}