# Waha Navigation Structure

Waha is a complex app with a lot of different screens. In this README, we'll cover the layout.

`/App.tsx`: This is the most top-level navigation component and the start of all rendering for Waha. It renders the `<Root />` component.

`/navigation/Root.tsx`: This component is in charge of determining what navigator to render based on 3 redux variables:
    1. `hasInstalledFirstLanguageInstance`: Whether the user has installed their first language instance or not.
    2. `isInstallingLanguageInstance`: Whether the app is currently installing a Language.
    3. `hasOnboarded`: Whether the user has finished the initial onboarding of the app.

`<Root />` can render 3 different things based on these variables.

1. `/navigation/Onboarding.tsx`: The navigator in charge of taking the user through installing their first Language. If `hasInstalledFirstLanguageInstance` is false, then the user is opening up the app for the first time, or else cancelled their install and still needs to install their first Language. In this case, the `<Onboarding />` navigator should be rendered. Note: we need the `hasOnboarded` variable because we need to render the `<Onboarding />` navigator even if we have already installed a Language but haven't finished onboarding yet. This situation would be if the user quits the app and restarts it in the middle of onboarding but after the Language has already been installed.
2. `/screens/LoadingScreen.tsx`: This screen shows the user's progress through downloading their Language Core Files. If `hasInstalledFirstLanguageInstance` is true but `isInstallingLanguageInstance` is false, we show this screen. This is because when the user installs any subsequent Language, they need to see the `<Loading />` screen without returning to the `<Onboarding />` navigator. When the user installs their first Language, they will see the `<LoadingScreen />` that is additionally part of the `<Onboarding />` navigator.
3. `/navigation/MainDrawer.tsx`: This is standard navigator that contains most of the app. It acts as a parent navigator to the `<MainStack />` navigator, just adding a drawer around it. It also contains some additional logic related to fetching Firestore Database data after a Language is installed.

`/navigation/MainStack.tsx`: This is the Stack navigator that contains most of the screens in Waha. Aside from many screen components, it renders one additional navigator.

`/navigation/SetsTabs.tsx`: This Tab navigator renders the three different Story Set tabs.

`InitialLanguageInstanceInstall`: This screen shows a welcome message and allows the user to select an initial language instance to install. This screen uses the `LanguageSelectScreen` component. Note: they have different names because the `SubsequentLanguageInstanceInstall` screen also uses the `LanguageSelectScreen` component.

`WahaOnboardingSlides`: This screen guides the user through a short, swipable tutorial on what Waha is.
      - `Loading`: This screen shows the user's progress through downloading a Language's Core Files.
    - `Loading`: This screen shows the user's progres through downloading their language instance Core Files. If `hasInstalledFirstLanguageInstance` is true but `isInstallingLanguageInstance` is false, we show this screen. This is because when the user installs any subsequent language instances, they need to see the loading screen without returning to the onboarding navigator. That's why this screen is by itself under **`Root`** in addition to being included in the **`Onboarding`** navigator. 
    - **`MainDrawer`**: This is normal navigator that the user will use 90% of the time. It acts as a parent navigator to the **`MainStack`** navigator, basically just adding a drawer around it. Any logic related to things that happen when the app isn't installing a language instance or on the first open is included in this file since it's higher level than **`MainStack`**. It renders the navigation drawer in combination with **`MainStack`**.
      - `WahaDrawer`: This is the component for the navigation drawer. It gets rendered as a prop in the `Drawer.Navigator` component.
      - **`MainStack`**: This is the main stack navigator that contains every other screen in Waha. 
        - **`SetsTabs`**: This is the tab navigator that contains the 3 different `SetsScreen`'s. There's one for each category of Story Set: Foundational, Topical, and Mobilization Tools.
          - `Foundational`: This uses the `SetsScreen` component and shows all the added Story Sets of the Foundational category.
          - `Topical`: This uses the `SetsScreen` component and shows all the added Story Sets of the Topical category.
          - `MobilizationTools`: This uses the `SetsScreen` component and shows all the added Mobilization Tools sets.
        - `Lessons`: Screen that shows a list of lessons in a Story Set.
        - `Play`: Screen that plays the lesson and allows audio control.
        - `Groups`: Screen that shows a list of groups separated by language instance. 
        - `AddSet`: Screen that shows a list of Story Sets in a specific category that are available to add to the `SetsScreen`.
        - `SubsequentLanguageSelect`: Screen that shows a list of available language instances to install.
        - `Storage`: Screen that shows each language instance and how much space its downloaded Story chapters are taking up.
        - `MobilizationTools`: Screen that, before unlocking, allows the user to unlock, and after unlocking, shows a list of groups and options to show the Mobilization Tools tab on all of them.
        - `MobilizationToolsUnlock`: A simple screen that allows the user to input a 6-digit code to unlock the Mobilization Tools.
        - `SecurityMode`: Screen that allows enabling/disabling and customizing Waha's Security Mode.
        - `SecurityOnboardingSlides`: The onboarding slides that the user must go through the first time they enable Security Mode.
        - `PianoPasscodeSet`: Uses the `PianoPasscodeSet` component. Prompts the user to create a key combination on the piano for unlocking Security Mode.
        - `PianoPasscodeSetConfirm`: Uses the `PianoPasscodeSet` component. Prompts the user to confirm the key combination on the piano.
        - `PianoPasscodeChange`: Uses the `PianoPasscodeSet` component. Prompts the user to enter a new key combination on the piano.
        - `PianoPasscodeChangeConfirm`: Uses the `PianoPasscodeSet` component. Prompts the user to confirm their new key combination on the piano.
        - `PianoApp`: Screen that acts as a security screen. When the user opens the app with Security Mode on, this inconspicuous piano screen
        - `Splash`: Screen that just shows the Waha logo. This acts as a pseudo splash screen that comes up whenever the user enters multitasking on an iOS device so that the app preview is hidden.
        - `Information`: Screen that shows the version and links to the privacy policy, donate page, and rage page.
        - `Contact Us`: Screen that allows the user to send in feedback on Waha.

