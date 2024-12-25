import { obj, str, num, arr, bool, jsonObj, exists, generate } from './base.js';

process.exit(generate('server.toml', () => {
    const defaultModules = ['js-module'];

    switch (process.env.ALTV_MODULE_TYPE) {
        case 'csharp':
            defaultModules.push('csharp-module');
            break;
        case 'jsv2':
            defaultModules.push('js-module-v2');
            break;
        case 'all':
            defaultModules.push('csharp-module', 'js-module-v2');
            break;
    }

    if (process.env.ALTV_BRANCH === 'release') {
        defaultModules.push('js-bytecode-module');
    }

    return ({
        host: str('ALTV_HOST'),
        name: str('ALTV_NAME'),
        port: num('ALTV_PORT'),
        password: str('ALTV_PASSWORD'),
        players: num('ALTV_PLAYERS'),
        duplicatePlayers: num('ALTV_DUPLICATE_PLAYERS'),
        timeout: num('ALTV_TIMEOUT'),
        streamingDistance: num('ALTV_STREAMING_DISTANCE'),
        migrationDistance: num('ALTV_MIGRATION_DISTANCE'),
        streamingTickRate: num('ALTV_STREAMING_TICK_RATE'),
        migrationTickRate: num('ALTV_MIGRATION_TICK_RATE'),
        colShapeTickRate: num('ALTV_COL_SHAPE_TICK_RATE'),
        mapBoundsMinX: num('ALTV_MAP_BOUNDS_MIN_X'),
        mapBoundsMinY: num('ALTV_MAP_BOUNDS_MIN_Y'),
        mapBoundsMaxX: num('ALTV_MAP_BOUNDS_MAX_X'),
        mapBoundsMaxY: num('ALTV_MAP_BOUNDS_MAX_Y'),
        mapCellAreaSize: num('ALTV_MAP_CELL_AREA_SIZE'),
        announce: bool('ALTV_ANNOUNCE'),
        language: str('ALTV_LANGUAGE'),
        token: str('ALTV_TOKEN'),
        useEarlyAuth: exists('ALTV_EARLY_AUTH_URL'),
        earlyAuthUrl: str('ALTV_EARLY_AUTH_URL'),
        useCdn: exists('ALTV_CDN_URL'),
        cdnUrl: str('ALTV_CDN_URL'),
        masterServerRelay: str('ALTV_MASTER_SERVER_RELAY'),
        sharedProjectName: str('ALTV_SHARED_PROJECT_NAME'),
        sharedProjectKey: str('ALTV_SHARED_PROJECT_KEY'),
        debug: bool('ALTV_DEBUG'),
        announceRetryErrorDelay: num('ALTV_ANNOUNCE_RETRY_ERROR_DELAY'),
        announceRetryErrorAttempts: num('ALTV_ANNOUNCE_RETRY_ERROR_ATTEMPTS'),
        connectionQueue: bool('ALTV_CONNECTION_QUEUE'),
        sendPlayerNames: bool('ALTV_SEND_PLAYER_NAMES'),
        spawnAfterConnect: bool('ALTV_SPAWN_AFTER_CONNECT'),
        hashClientResourceName: bool('ALTV_HASH_CLIENT_RESOURCE_NAME'),
        maxClientScriptEventSize: num('ALTV_MAX_CLIENT_SCRIPT_EVENT_SIZE'),
        maxServerScriptEventSize: num('ALTV_MAX_SERVER_SCRIPT_EVENT_SIZE'),
        allowUnknownRPCEvents: bool('ALTV_ALLOW_UNKNOWN_RPC_EVENTS'),
        voice: obj({
            bitrate: num('ALTV_VOICE_BITRATE'),
            externalSecret: num('ALTV_VOICE_EXTERNAL_SECRET'),
            externalHost: str('ALTV_VOICE_EXTERNAL_HOST'),
            externalPort: num('ALTV_VOICE_EXTERNAL_PORT'),
            externalPublicHost: str('ALTV_VOICE_EXTERNAL_PUBLIC_HOST'),
            externalPublicPort: num('ALTV_VOICE_EXTERNAL_PUBLIC_PORT')
        }),
        maxStreaming: obj({
            entities: num('ALTV_MAX_STREAMING_ENTITIES'),
            peds: num('ALTV_MAX_STREAMING_PEDS'),
            objects: num('ALTV_MAX_STREAMING_OBJECTS'),
            vehicles: num('ALTV_MAX_STREAMING_VEHICLES'),
        }),
        modules: arr('ALTV_MODULES') ?? defaultModules,
        resources: arr('ALTV_RESOURCES') ?? ['*'],
        logStreams: arr('ALTV_LOG_STREAMS'),
        logTimeFormat: str('ALTV_LOG_TIME_FORMAT'),
        logsToKeep: num('ALTV_LOGS_TO_KEEP'),
        worldProfiler: obj({
            host: str('ALTV_WORLD_PROFILER_HOST'),
            port: num('ALTV_WORLD_PROFILER_PORT')
        }),
        pools: jsonObj('ALTV_POOLS'),
        threads: obj({
            streamer: num('ALTV_THREADS_STREAMER'),
            migration: num('ALTV_THREADS_MIGRATION'),
            syncSend: num('ALTV_THREADS_SYNC_SEND'),
            syncReceive: num('ALTV_THREADS_SYNC_RECEIVE'),
        }),
        dlcWhitelist: arr('ALTV_DLC_WHITELIST'),
        disableOptionalProps: bool('ALTV_DISABLE_OPTIONAL_PROPS'),
        'antiCheat': obj({
            weaponSwitch: bool('ALTV_ANTI_CHEAT_WEAPON_SWITCH'),
            collision: bool('ALTV_ANTI_CHEAT_COLLISION')
        }),
        resourceContainerizerMode: bool('ALTV_RESOURCE_CONTAINERIZER_NODE'),
        resourceBlockSize: num('ALTV_RESOURCE_BLOCK_SIZE'),
        'csharp-module': obj({
            disableDependencyDownload: bool('ALTV_CSHARP_DISABLE_DEPENDENCY_DOWNLOAD')
        }),
        'js-module': obj({
            'source-maps': bool('ALTV_JS_SOURCE_MAPS'),
            'heap-profiler': bool('ALTV_JS_HEAP_PROFILER'),
            'profiler': bool('ALTV_JS_PROFILER'),
            'global-webcrypto': bool('ALTV_JS_GLOBAL_WEBCRYPTO'),
            'network-imports': bool('ALTV_JS_NETWORK_IMPORTS'),
            'extra-cli-args': arr('ALTV_JS_EXTRA_CLI_ARGS', ' '),
            inspector: obj({
                host: str('ALTV_JS_INSPECTOR_HOST'),
                port: num('ALTV_JS_INSPECTOR_PORT')
            })
        })
    });
}));
