import { Axios } from "axios";

function dumpDadosRequestConfig(config) {
    let { method, baseURL, url, data, headers } = config;

    return `Solicitação:\n`
        + `(${method}) ${baseURL + url}\n`
        + `headers => ${JSON.stringify(headers, null, 2)}\n`
        + `body => ${JSON.stringify(data, null, 2)}\n`
        ;
}

function dumpDadosResponse(response) {
    let { status, data } = response;

    return `Resposta:\n`
        + `Status: ${status}\n`
        + `data => ${JSON.stringify(data, null, 2)}\n`
}

/**
 * Adiciona interceptors a instancia AXIOS para apresentar no console os dados que estão 
 * sendo enviados e recebidos durante o uso do AXIOS para cada requisição executada.
 * 
 * @param {Axios} apiAxiosInstance 
 */
export const ativarLogRequisicoes = (apiAxiosInstance) => {
    console
        .log(`\n============================================================\n`
            + `== 🚀📢⚠️ REQUEST LOG ATIVADO ⚠️📢🚀\n`
            + `============================================================\n`
            + `\n\n`
        )

    // ==> interceptando REQUISIÇÃO
    // ======================================================================
    apiAxiosInstance.interceptors.request.use(function (config) {
        // console.log('CONFIG');
        // console.log(config)

        // "📞⚡️🚨🚀🚦🚥🚔🚓💣🧨🛡📌🔎🛑☢️⛔️📛💢⚠️❗️❓✴️✅❎🔴🟠🟡🟢🔵🟣⚫️⚪️🔶🔔📢🚩🏴‍☠️🏴🏳️🏁"


        console
            .log(`\n============================================================\n`
                + `== 🚀 LOG ON REQUEST 🚀\n`
                + `============================================================\n`
                + dumpDadosRequestConfig(config)
                + `============================================================\n`
                + `\n\n`
            )



        // ----------------------------------------------------------------------
        return config; // é obrigatorio retornar
    }, function (error) {
        // adicione aqui as ações a serem executadas em caso de erro na requisição

        console
            .log(`\n============================================================\n`
                + `== 🚨⚠️📢 ERRO ON REQUEST: ${error.message}\n`
                + `============================================================\n`
                + dumpDadosRequestConfig(error.config)
                + `============================================================\n`
                // + '\n'
            )
        // ----------------------------------------------------------------------
        return Promise.reject(error);// é obrigatorio retornar
    });

    // ==> interceptando RESPOSTA
    // ======================================================================
    apiAxiosInstance.interceptors.response.use(function (response) {
        // console.log('RESPONSE:')
        // console.log(JSON.stringify(response, null, 2));

        let { method, baseURL, url, data } = response.config;
        console
            .log(`\n============================================================\n`
                + `== 📞 LOG ON RESPONSE:\n`
                + `============================================================\n`
                + dumpDadosRequestConfig(response.config)
                + `============================================================\n`
                + dumpDadosResponse(response)
                + `============================================================\n\n\n`
                // + '\n'
            )


        // ----------------------------------------------------------------------
        return response; // é obrigatorio retornar
    }, function (error) {
        // adicione aqui as ações a serem executadas em caso de erro na resposta

        console
            .log(`\n============================================================\n`
                + `== 🚨⚠️📢 ERRO ON RESPONSE: ${error.message}\n`
                + `============================================================\n`
                + dumpDadosRequestConfig(error.config)
                + `============================================================\n`
                + dumpDadosResponse(response)
                + `============================================================\n`
                // + '\n'
            )

        // ----------------------------------------------------------------------
        return Promise.reject(error); // é obrigatorio retornar
    });
}

// ativarLogRequisicoes();