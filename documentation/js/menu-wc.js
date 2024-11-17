'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">sanai3i documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-ab0c05c1b0e0dc8a5b50384ce233a54e936fde50c658c9bae50502d11f6b45c6bf06d4efbbeb68948e5d39516b02518f4f876d21157c8484a99fc2b9b20e8f0c"' : 'data-bs-target="#xs-components-links-module-AppModule-ab0c05c1b0e0dc8a5b50384ce233a54e936fde50c658c9bae50502d11f6b45c6bf06d4efbbeb68948e5d39516b02518f4f876d21157c8484a99fc2b9b20e8f0c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ab0c05c1b0e0dc8a5b50384ce233a54e936fde50c658c9bae50502d11f6b45c6bf06d4efbbeb68948e5d39516b02518f4f876d21157c8484a99fc2b9b20e8f0c"' :
                                            'id="xs-components-links-module-AppModule-ab0c05c1b0e0dc8a5b50384ce233a54e936fde50c658c9bae50502d11f6b45c6bf06d4efbbeb68948e5d39516b02518f4f876d21157c8484a99fc2b9b20e8f0c"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AuthModule-36491875ec174082cdc87b8eaa52fe5f48c31c1d40f61592ef6c571971d7cbf21b85ae281041136d5beb58c72728ad4774e51622abf6b92c32e84f5daf84a4e0"' : 'data-bs-target="#xs-components-links-module-AuthModule-36491875ec174082cdc87b8eaa52fe5f48c31c1d40f61592ef6c571971d7cbf21b85ae281041136d5beb58c72728ad4774e51622abf6b92c32e84f5daf84a4e0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-36491875ec174082cdc87b8eaa52fe5f48c31c1d40f61592ef6c571971d7cbf21b85ae281041136d5beb58c72728ad4774e51622abf6b92c32e84f5daf84a4e0"' :
                                            'id="xs-components-links-module-AuthModule-36491875ec174082cdc87b8eaa52fe5f48c31c1d40f61592ef6c571971d7cbf21b85ae281041136d5beb58c72728ad4774e51622abf6b92c32e84f5daf84a4e0"' }>
                                            <li class="link">
                                                <a href="components/CompleteProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompleteProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EmailRegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailRegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OtpInputComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OtpInputComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PhoneRegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhoneRegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterMethodComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterMethodComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserTypeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VerifyCodeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerifyCodeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WelcomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WelcomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link" >AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CoreModule-38b2ff9f4e2a872d548f81903ee3a76066f853879a9e6b8d187f1b5ffd765122f2644e9497cd09bd97454e7ec8ea18627e49834d5a17e689ed65e577efccea83"' : 'data-bs-target="#xs-components-links-module-CoreModule-38b2ff9f4e2a872d548f81903ee3a76066f853879a9e6b8d187f1b5ffd765122f2644e9497cd09bd97454e7ec8ea18627e49834d5a17e689ed65e577efccea83"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-38b2ff9f4e2a872d548f81903ee3a76066f853879a9e6b8d187f1b5ffd765122f2644e9497cd09bd97454e7ec8ea18627e49834d5a17e689ed65e577efccea83"' :
                                            'id="xs-components-links-module-CoreModule-38b2ff9f4e2a872d548f81903ee3a76066f853879a9e6b8d187f1b5ffd765122f2644e9497cd09bd97454e7ec8ea18627e49834d5a17e689ed65e577efccea83"' }>
                                            <li class="link">
                                                <a href="components/MainLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainLayoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DiscoverModule.html" data-type="entity-link" >DiscoverModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-DiscoverModule-63f8520a618a5466226d462bd23f10d760f753cb87111dcfdd548afd4a3461e89853c854356b0b87a7e25d78c6720a65ea610293ff38d2e1dc395f2ca79e4dd0"' : 'data-bs-target="#xs-components-links-module-DiscoverModule-63f8520a618a5466226d462bd23f10d760f753cb87111dcfdd548afd4a3461e89853c854356b0b87a7e25d78c6720a65ea610293ff38d2e1dc395f2ca79e4dd0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DiscoverModule-63f8520a618a5466226d462bd23f10d760f753cb87111dcfdd548afd4a3461e89853c854356b0b87a7e25d78c6720a65ea610293ff38d2e1dc395f2ca79e4dd0"' :
                                            'id="xs-components-links-module-DiscoverModule-63f8520a618a5466226d462bd23f10d760f753cb87111dcfdd548afd4a3461e89853c854356b0b87a7e25d78c6720a65ea610293ff38d2e1dc395f2ca79e4dd0"' }>
                                            <li class="link">
                                                <a href="components/DiscoverComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiscoverComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FeaturesModule.html" data-type="entity-link" >FeaturesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-HomeModule-7d87ed7ea1406b2e619c0476286a6f5a02af2c62920acdfbb54a69170d19bca5566d7bcd02cfe071c35e6873e4b8c65cfd512c32b8df20e790406693cc9830f8"' : 'data-bs-target="#xs-components-links-module-HomeModule-7d87ed7ea1406b2e619c0476286a6f5a02af2c62920acdfbb54a69170d19bca5566d7bcd02cfe071c35e6873e4b8c65cfd512c32b8df20e790406693cc9830f8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-7d87ed7ea1406b2e619c0476286a6f5a02af2c62920acdfbb54a69170d19bca5566d7bcd02cfe071c35e6873e4b8c65cfd512c32b8df20e790406693cc9830f8"' :
                                            'id="xs-components-links-module-HomeModule-7d87ed7ea1406b2e619c0476286a6f5a02af2c62920acdfbb54a69170d19bca5566d7bcd02cfe071c35e6873e4b8c65cfd512c32b8df20e790406693cc9830f8"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkerDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkerDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessagesModule.html" data-type="entity-link" >MessagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MessagesModule-988a0e65abd819620056d3e7f49ee2f499b26f0be756eb59bcb393925398914e1b4f1b98f3dea3198808eeacaf69129b9b4d2eaffc31d2f1779029f24807ddba"' : 'data-bs-target="#xs-components-links-module-MessagesModule-988a0e65abd819620056d3e7f49ee2f499b26f0be756eb59bcb393925398914e1b4f1b98f3dea3198808eeacaf69129b9b4d2eaffc31d2f1779029f24807ddba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MessagesModule-988a0e65abd819620056d3e7f49ee2f499b26f0be756eb59bcb393925398914e1b4f1b98f3dea3198808eeacaf69129b9b4d2eaffc31d2f1779029f24807ddba"' :
                                            'id="xs-components-links-module-MessagesModule-988a0e65abd819620056d3e7f49ee2f499b26f0be756eb59bcb393925398914e1b4f1b98f3dea3198808eeacaf69129b9b4d2eaffc31d2f1779029f24807ddba"' }>
                                            <li class="link">
                                                <a href="components/MessagesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ProfileModule-42a0d1d3b1e50e5ba4f09c2d9cf8a9c6f07dd7814c511d970c9d9ad9ca55c69e4a6ed17d20484bd3e2965297eb002b887ac2b9467250b2afbe979b31a2f8ac87"' : 'data-bs-target="#xs-components-links-module-ProfileModule-42a0d1d3b1e50e5ba4f09c2d9cf8a9c6f07dd7814c511d970c9d9ad9ca55c69e4a6ed17d20484bd3e2965297eb002b887ac2b9467250b2afbe979b31a2f8ac87"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-42a0d1d3b1e50e5ba4f09c2d9cf8a9c6f07dd7814c511d970c9d9ad9ca55c69e4a6ed17d20484bd3e2965297eb002b887ac2b9467250b2afbe979b31a2f8ac87"' :
                                            'id="xs-components-links-module-ProfileModule-42a0d1d3b1e50e5ba4f09c2d9cf8a9c6f07dd7814c511d970c9d9ad9ca55c69e4a6ed17d20484bd3e2965297eb002b887ac2b9467250b2afbe979b31a2f8ac87"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileRoutingModule.html" data-type="entity-link" >ProfileRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RequestsModule.html" data-type="entity-link" >RequestsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RequestsModule-7b5409a9a01d77123aafbda3354ae2467eff9c6ae494685808d1efc255913e3beec886bbecbfe804b0dd3d0f9926e4c06fe37385cbab5572a5a123a8db7119b6"' : 'data-bs-target="#xs-components-links-module-RequestsModule-7b5409a9a01d77123aafbda3354ae2467eff9c6ae494685808d1efc255913e3beec886bbecbfe804b0dd3d0f9926e4c06fe37385cbab5572a5a123a8db7119b6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RequestsModule-7b5409a9a01d77123aafbda3354ae2467eff9c6ae494685808d1efc255913e3beec886bbecbfe804b0dd3d0f9926e4c06fe37385cbab5572a5a123a8db7119b6"' :
                                            'id="xs-components-links-module-RequestsModule-7b5409a9a01d77123aafbda3354ae2467eff9c6ae494685808d1efc255913e3beec886bbecbfe804b0dd3d0f9926e4c06fe37385cbab5572a5a123a8db7119b6"' }>
                                            <li class="link">
                                                <a href="components/RequestDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestDetailsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesModule.html" data-type="entity-link" >ServicesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ServicesModule-b595ecb3191bcc34567417e34c501730659c23567a4d1adb367e1874f089c14ebdd9cc5c7e1b4e18b607225eabb529a4d3262f1b6c56766f9ba3fef80ce24dc0"' : 'data-bs-target="#xs-components-links-module-ServicesModule-b595ecb3191bcc34567417e34c501730659c23567a4d1adb367e1874f089c14ebdd9cc5c7e1b4e18b607225eabb529a4d3262f1b6c56766f9ba3fef80ce24dc0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ServicesModule-b595ecb3191bcc34567417e34c501730659c23567a4d1adb367e1874f089c14ebdd9cc5c7e1b4e18b607225eabb529a4d3262f1b6c56766f9ba3fef80ce24dc0"' :
                                            'id="xs-components-links-module-ServicesModule-b595ecb3191bcc34567417e34c501730659c23567a4d1adb367e1874f089c14ebdd9cc5c7e1b4e18b607225eabb529a4d3262f1b6c56766f9ba3fef80ce24dc0"' }>
                                            <li class="link">
                                                <a href="components/NewRequestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServiceDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServicesListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubServiceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubServiceComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-ab24052eddb6af9c545e4cff7b0a74a389f58b6ee3df764b33eaab90268c40ec143eee68e08015882fb2b1e2fddc3118b3174dccd7d4dfff078ba6d884863f91"' : 'data-bs-target="#xs-components-links-module-SharedModule-ab24052eddb6af9c545e4cff7b0a74a389f58b6ee3df764b33eaab90268c40ec143eee68e08015882fb2b1e2fddc3118b3174dccd7d4dfff078ba6d884863f91"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-ab24052eddb6af9c545e4cff7b0a74a389f58b6ee3df764b33eaab90268c40ec143eee68e08015882fb2b1e2fddc3118b3174dccd7d4dfff078ba6d884863f91"' :
                                            'id="xs-components-links-module-SharedModule-ab24052eddb6af9c545e4cff7b0a74a389f58b6ee3df764b33eaab90268c40ec143eee68e08015882fb2b1e2fddc3118b3174dccd7d4dfff078ba6d884863f91"' }>
                                            <li class="link">
                                                <a href="components/BackButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BackButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FeaturedSliderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FeaturedSliderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PriceNegotiationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PriceNegotiationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchBarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-ab24052eddb6af9c545e4cff7b0a74a389f58b6ee3df764b33eaab90268c40ec143eee68e08015882fb2b1e2fddc3118b3174dccd7d4dfff078ba6d884863f91"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-ab24052eddb6af9c545e4cff7b0a74a389f58b6ee3df764b33eaab90268c40ec143eee68e08015882fb2b1e2fddc3118b3174dccd7d4dfff078ba6d884863f91"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-ab24052eddb6af9c545e4cff7b0a74a389f58b6ee3df764b33eaab90268c40ec143eee68e08015882fb2b1e2fddc3118b3174dccd7d4dfff078ba6d884863f91"' :
                                            'id="xs-pipes-links-module-SharedModule-ab24052eddb6af9c545e4cff7b0a74a389f58b6ee3df764b33eaab90268c40ec143eee68e08015882fb2b1e2fddc3118b3174dccd7d4dfff078ba6d884863f91"' }>
                                            <li class="link">
                                                <a href="pipes/RequestStatusPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestStatusPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/UrlSanitizerPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UrlSanitizerPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FeaturedSliderService.html" data-type="entity-link" >FeaturedSliderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeocodingService.html" data-type="entity-link" >GeocodingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocationService.html" data-type="entity-link" >LocationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestDataService.html" data-type="entity-link" >RequestDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServicesService.html" data-type="entity-link" >ServicesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WorkerService.html" data-type="entity-link" >WorkerService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/HttpConfigInterceptor.html" data-type="entity-link" >HttpConfigInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressResult.html" data-type="entity-link" >AddressResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CostBreakdown.html" data-type="entity-link" >CostBreakdown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CostBreakdown-1.html" data-type="entity-link" >CostBreakdown</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtraOption.html" data-type="entity-link" >ExtraOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FeaturedAd.html" data-type="entity-link" >FeaturedAd</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GeocodingResult.html" data-type="entity-link" >GeocodingResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MainService.html" data-type="entity-link" >MainService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NegotiationHistory.html" data-type="entity-link" >NegotiationHistory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NegotiationOffer.html" data-type="entity-link" >NegotiationOffer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaymentDetails.html" data-type="entity-link" >PaymentDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PriceNegotiationData.html" data-type="entity-link" >PriceNegotiationData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PriceNegotiationResult.html" data-type="entity-link" >PriceNegotiationResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PriceUpdate.html" data-type="entity-link" >PriceUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProfileFormData.html" data-type="entity-link" >ProfileFormData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RegistrationMethod.html" data-type="entity-link" >RegistrationMethod</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestLocation.html" data-type="entity-link" >RequestLocation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestStep.html" data-type="entity-link" >RequestStep</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestViewModel.html" data-type="entity-link" >RequestViewModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Review.html" data-type="entity-link" >Review</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Section.html" data-type="entity-link" >Section</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceItem.html" data-type="entity-link" >ServiceItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceProvider.html" data-type="entity-link" >ServiceProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceRequest.html" data-type="entity-link" >ServiceRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceSection.html" data-type="entity-link" >ServiceSection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceType.html" data-type="entity-link" >ServiceType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Stats.html" data-type="entity-link" >Stats</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubService.html" data-type="entity-link" >SubService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrackingInfo.html" data-type="entity-link" >TrackingInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TrendySubService.html" data-type="entity-link" >TrendySubService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Worker.html" data-type="entity-link" >Worker</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkerFilter.html" data-type="entity-link" >WorkerFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkerService.html" data-type="entity-link" >WorkerService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkerStats.html" data-type="entity-link" >WorkerStats</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WorkerStats-1.html" data-type="entity-link" >WorkerStats</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});