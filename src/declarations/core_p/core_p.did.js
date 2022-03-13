export const idlFactory = ({ IDL }) => {
  const TokenId = IDL.Nat;
  return IDL.Service({
    'approve' : IDL.Func([IDL.Principal, TokenId], [], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Opt(IDL.Nat)], ['query']),
    'doIOwn' : IDL.Func([IDL.Nat], [IDL.Bool], ['query']),
    'getApproved' : IDL.Func([IDL.Nat], [IDL.Principal], []),
    'isApprovedForAll' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Bool],
        [],
      ),
    'mint' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'ownerOf' : IDL.Func([TokenId], [IDL.Opt(IDL.Principal)], ['query']),
    'setApprovalForAll' : IDL.Func([IDL.Principal, IDL.Bool], [], ['oneway']),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'tokenURI' : IDL.Func([TokenId], [IDL.Opt(IDL.Text)], ['query']),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [],
        ['oneway'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
