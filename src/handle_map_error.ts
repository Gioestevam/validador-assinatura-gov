export const mapHandleError = (status: number): { message: string } => {
    const mapError: Record<number, string> = {
        400: 'Você submeteu um documento sem assinatura reconhecível ou com assinatura corrompida.',
        404: 'O recurso solicitado não foi encontrado.',
        408: 'Houve uma instabilidade no sistema, tente novamente mais tarde.',
        422: 'Você submeteu um documento inválido.',
        500: 'Ocorreu um erro na validação do seu arquivo',
        502: 'Houve uma instabilidade no sistema, tente novamente mais tarde.',
        503: 'Não foi possível estabelecer conexão com o servidor. Verifique sua conexão ou tente novamente mais tarde.',
    }

    return {
        message: mapError[status] || mapError[500]
    }
}
