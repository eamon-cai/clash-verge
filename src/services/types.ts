/**
 * Some interface for clash api
 */
export namespace ApiType {
  export interface ConfigData {
    port: number;
    mode: string;
    ipv6: boolean;
    "socket-port": number;
    "allow-lan": boolean;
    "log-level": string;
    "mixed-port": number;
    "redir-port": number;
    "socks-port": number;
    "tproxy-port": number;
  }

  export interface RuleItem {
    type: string;
    payload: string;
    proxy: string;
  }

  export interface ProxyItem {
    name: string;
    type: string;
    udp: boolean;
    history: {
      time: string;
      delay: number;
    }[];
    all?: string[];
    now?: string;
  }

  export type ProxyGroupItem = Omit<ProxyItem, "all"> & {
    all: ProxyItem[];
  };

  export interface TrafficItem {
    up: number;
    down: number;
  }

  export interface LogItem {
    type: string;
    time?: string;
    payload: string;
  }

  export interface ConnectionsItem {
    id: string;
    metadata: {
      network: string;
      type: string;
      host: string;
      sourceIP: string;
      sourcePort: string;
      destinationPort: string;
      destinationIP?: string;
    };
    upload: number;
    download: number;
    start: string;
    chains: string[];
    rule: string;
    rulePayload: string;
    curUpload?: number; // calculate
    curDownload?: number; // calculate
  }

  export interface Connections {
    downloadTotal: number;
    uploadTotal: number;
    connections: ConnectionsItem[];
  }
}

/**
 * Some interface for command
 */
export namespace CmdType {
  export type ProfileType = "local" | "remote" | "merge" | "script";

  export interface ClashInfo {
    status: string;
    port?: string;
    server?: string;
    secret?: string;
  }

  export interface ProfileItem {
    uid: string;
    type?: ProfileType | string;
    name?: string;
    desc?: string;
    file?: string;
    url?: string;
    updated?: number;
    selected?: {
      name?: string;
      now?: string;
    }[];
    extra?: {
      upload: number;
      download: number;
      total: number;
      expire: number;
    };
    option?: ProfileOption;
  }

  export interface ProfileOption {
    user_agent?: string;
    with_proxy?: boolean;
  }

  export interface ProfilesConfig {
    current?: string;
    chain?: string[];
    valid?: string[];
    items?: ProfileItem[];
  }

  export interface VergeConfig {
    language?: string;
    theme_mode?: "light" | "dark";
    theme_blur?: boolean;
    traffic_graph?: boolean;
    enable_tun_mode?: boolean;
    enable_auto_launch?: boolean;
    enable_silent_start?: boolean;
    enable_system_proxy?: boolean;
    enable_proxy_guard?: boolean;
    system_proxy_bypass?: string;
    theme_setting?: {
      primary_color?: string;
      secondary_color?: string;
      primary_text?: string;
      secondary_text?: string;
      info_color?: string;
      error_color?: string;
      warning_color?: string;
      success_color?: string;
      font_family?: string;
      css_injection?: string;
    };
  }

  type ClashConfigValue = any;

  export interface ProfileMerge {
    // clash config fields (default supports)
    rules?: ClashConfigValue;
    proxies?: ClashConfigValue;
    "proxy-groups"?: ClashConfigValue;
    "proxy-providers"?: ClashConfigValue;
    "rule-providers"?: ClashConfigValue;
    // clash config fields (use flag)
    tun?: ClashConfigValue;
    dns?: ClashConfigValue;
    hosts?: ClashConfigValue;
    script?: ClashConfigValue;
    profile?: ClashConfigValue;
    payload?: ClashConfigValue;
    "interface-name"?: ClashConfigValue;
    "routing-mark"?: ClashConfigValue;
    // functional fields
    use?: string[];
    "prepend-rules"?: any[];
    "append-rules"?: any[];
    "prepend-proxies"?: any[];
    "append-proxies"?: any[];
    "prepend-proxy-groups"?: any[];
    "append-proxy-groups"?: any[];
  }

  // partial of the clash config
  export type ProfileData = Partial<{
    rules: any[];
    proxies: any[];
    "proxy-groups": any[];
    "proxy-providers": any[];
    "rule-providers": any[];

    [k: string]: any;
  }>;

  export interface ChainItem {
    item: ProfileItem;
    merge?: ProfileMerge;
    script?: string;
  }

  export interface EnhancedPayload {
    chain: ChainItem[];
    valid: string[];
    current: ProfileData;
    callback: string;
  }

  export interface EnhancedResult {
    data: ProfileData;
    status: string;
    error?: string;
  }
}
